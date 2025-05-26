import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'

import Button from '../../components/Button'
import Card from '../../components/Card'

import boleto from '../../assets/images/barcode 1.png'
import cartao from '../../assets/images/credit-card 1.png'

import { usePurchaseMutation } from '../../services/api'

import { Row, InputGroup, TabButton } from './styles'
import { RootReducer } from '../../store'
import { getTotalPrice, parseToBrl } from '../../utils'
import { clear } from '../../store/reducers/cart'

type Installment = {
  // tipagem pra fazer o parcelamento
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation() //passando para nos retornar objetos para ter o estado da requisição tamo conctando com o api que tem las as especificações ex email: string...
  const { items } = useSelector((state: RootReducer) => state.cart) //acessando o reducer pra pegar o estado do carrinho pra pegarmos a quantidade de itens no carrinho pra construir a logica de fechar o carrimho quando for pro pagamento
  const [installments, setInstallments] = useState<Installment[]>([]) //para fazer o parcelamento do cartão
  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)

  const form = useFormik({
    //coloca aqui campos do formulario que vao ser usados
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome presica ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(15, 'O campo precisa ter 14 caracteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string() //o confirm é diferente pq estamos passando a validação que os 2 emails tem q ser iguais
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when(
        (
          values,
          schema //when(quando) o pagamento com cartao estiver clicado o submit do formulario so vai acontecer se os campos estiverem escritos
        ) => (payWithCard ? schema.required('O campo é obrigatório') : schema)
      ),
      installments: Yup.number().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    onSubmit: (values) => {
      //to conseguindo ter acesso aos itens value.cpf... atraves do api que ta configurado la esses itens
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullName
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner,
              name: values.cardOwner
            },
            expires: {
              month: Number(values.expiresMonth), //como ta config com string aqui fazemos a transversão pra number
              year: Number(values.expiresYear)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid //Todo campo inicia invalido(nada escrito) q no caso é pego pelo form.errors mas nem todo campo inicia tocado com algo escrito por isso tem o touch pra identifcar quando o campo for clicado e por isso pra construir essa lógica usamos os 2 pra construir o erro do campo quando n estiver com campo escrito ou seja se o error e o touch for false significa q o campo ta vazio e nem foi clicado se o touch for clicado fica true e o error false significa q foi clicado mas sem conteudo, agr se tiver os 2 true passa o erro ao checkout

    return hasError
  }

  useEffect(() => {
    const calculateInstallments = () => {
      const installmentsAray: Installment[] = []

      for (let i = 1; i <= 6; i++) {
        //enquanto o i for <=6 o for vai ser executado
        installmentsAray.push({
          //o que vai ser executado
          quantity: i, //quantidade que vem do for ai vai passando do 1 ate o 6
          amount: totalPrice / i, //a soma de todos os itens do carrinho / pela quantidade de itens
          formattedAmount: parseToBrl(totalPrice / i) //pra deixar o preço em br
        })
      }

      return installmentsAray
    }

    if (totalPrice > 0) {
      setInstallments(calculateInstallments()) //so é executado quando tiver valor maior que 0 no carrinho
    }
  }, [totalPrice])

  useEffect(() => {
    //esvaziar o carrinho se tiver sucesso na compra
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && !isSuccess) {
    //usamos o navigate do react router dom como componente pois queremos direcionar pra pagina inicial se n tiver nenhum item no carrinho ou seja = 0, items esse q acessamos atraves do store
    return <Navigate to="/" />
  }

  return (
    //esses onSubmit e onChange estao relacionados ao formik que faz o envio dos itens escritos no formulario então se estiver escrito la no nome envia o nome
    <div className="container">
      {isSuccess && data ? ( //if se apos clicar botao finalizar e der tudo certo vai ter o issucess fornecido pelo purchase e tambem so se tiver o data que é o retorno que gera um ID quando finaliza uma compra assim se n tiver nenhum erro renderiza a mensagem de obrigado e se n tiver renderiza o form
        <Card title="Muito obrigado!">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br />
              Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de crédito' : 'Boleto Bancario'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
          </>
        </Card>
      ) : (
        //else
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de cobrança">
            <>
              <Row>
                <InputGroup>
                  <label htmlFor="fullName">Nome completo</label>
                  <input
                    id="email"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange} //Ela serve para atualizar o estado  sempre que o usuário digita ou modifica algo em um campo de input, textarea, select etc...
                    onBlur={form.handleBlur} //pra poder ve os itens que ja foram tocados pra assim fazer uma validação que é o pacote yup o responsável
                    className={checkInputHasError('fullName') ? 'error' : ''} //para dar error no checkout caso n esteja dentro dos padroes do campo como menos de 3 letras
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('email') ? 'error' : ''}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    id="cpf"
                    type="text"
                    name="cpf"
                    value={form.values.cpf}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                    mask="999.999.999-99"
                  />
                </InputGroup>
              </Row>
              <h3 className="margin-top">
                Dados de entrega - conteúdo digital
              </h3>
              <Row>
                <InputGroup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    type="email"
                    id="deliveryEmail"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('email') ? 'error' : ''}
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="confirmDeliveryEmail">
                    Confirme o E-mail
                  </label>
                  <input
                    type="email"
                    id="confirmDeliveryEmail"
                    name="confirmDeliveryEmail"
                    value={form.values.confirmDeliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      checkInputHasError('confirmDeliveryEmail') ? 'error' : ''
                    }
                  />
                </InputGroup>
              </Row>
            </>
          </Card>
          <Card title="Pagamento">
            <>
              <TabButton
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
                type="button"
              >
                <img src={boleto} alt="Boleto" />
                Boleto bancário
              </TabButton>
              <TabButton
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
                type="button"
              >
                <img src={cartao} alt="Cartão de crédito" />
                Cartão de crédito
              </TabButton>
              <div className="margin-top">
                {payWithCard ? ( //fazendo um ternario pra quando pagamento for no cartao exibe o card e quando for boleto exibe o texto
                  <>
                    <Row>
                      <InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          type="text"
                          id="cardOwner"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardOwner') ? 'error' : ''
                          }
                        />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardOwner">
                          CPF do titular do cartão
                        </label>
                        <InputMask
                          type="text"
                          id="cpfCardOwner"
                          name="cpfCardOwner"
                          value={form.values.cpfCardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cpfCardOwner') ? 'error' : ''
                          }
                          mask="999.999.999-99" //mascara pra o cpf ja ficar definido assim quando digitar
                        />
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup>
                        <label htmlFor="cardDisplayName">Nome do cartão</label>
                        <input
                          type="text"
                          id="cardDisplayName"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <InputMask
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={form.values.cardNumber}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardNumber') ? 'error' : ''
                          }
                          mask="9999 9999 9999 9999"
                        />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="expiresMonth">Mês de expiração</label>
                        <InputMask
                          type="text"
                          id="expiresMonth"
                          name="expiresMonth"
                          value={form.values.expiresMonth}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresMonth') ? 'error' : ''
                          }
                          mask="99"
                        />
                      </InputGroup>
                      <InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de expiração</label>
                        <InputMask
                          type="text"
                          id="expiresYear"
                          name="expiresYear"
                          value={form.values.expiresYear}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('expiresYear') ? 'error' : ''
                          }
                          mask="999"
                        />
                      </InputGroup>
                      <InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <input
                          type="text"
                          id="cardCode"
                          name="cardCode"
                          value={form.values.cardCode}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('cardCode') ? 'error' : ''
                          }
                        />
                      </InputGroup>
                    </Row>
                    <Row marginTop="24px">
                      <InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamentos</label>
                        <select
                          id="installments"
                          name="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={
                            checkInputHasError('installments') ? 'error' : ''
                          }
                        >
                          {installments.map(
                            (
                              installments //parcelamento do cartão, conseguimos pegar a quantidade e o valor total e renderizar no site
                            ) => (
                              <option
                                value={installments.quantity}
                                key={installments.quantity}
                              >
                                {installments.quantity}x de{' '}
                                {installments.formattedAmount}
                              </option>
                            )
                          )}
                        </select>
                      </InputGroup>
                    </Row>
                  </>
                ) : (
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolor corrupti aspernatur obcaecati. Repudiandae fuga
                    quaerat eos autem exercitationem. Ullam pariatur veniam quas
                    temporibus deserunt molestiae voluptatibus illo consequuntur
                    nam est!
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button
            type="submit"
            title="Finalizar"
            onClick={form.handleSubmit}
            disabled={isLoading} //quando estiver carregando a pagina o botao troca o texto
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
