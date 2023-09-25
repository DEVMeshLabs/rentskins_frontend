import Common from '@/components/Common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do Counter-Strike. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function TermoDeUso() {
  return (
    <main className="w-full bg-mesh-color-others-black">
      <div className="mx-auto w-8/12 py-10">
        <Common.Title
          bold={700}
          color="white"
          className="flex justify-center text-center text-5xl"
        >
          Termos de Serviço e Uso
        </Common.Title>

        <div className="mt-8 space-y-10 pb-20 text-justify leading-tight text-neutral-200">
          <p>
            Bem-vindo à plataforma de negociação RentSkins! Antes de iniciar a
            utilização dos nossos serviços, por favor, leia atentamente o
            presente termo. Ao acessar ou utilizar nosso website, você concorda
            em cumprir com os termos e condições estabelecidos. Caso não
            concorde com nossos termos, recomenda-se que não deva utilizar
            nossos serviços, pois a aplicação dos termos será realizada de forma
            integral.
          </p>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DAS DEFINIÇÕES
            </Common.Title>
            <ol>
              <li>
                1.1. &quot;<span className="underline">Empresa</span>&quot;
                refere-se à nossa empresa de negociação de skins, fornecedora
                dos serviços oferecidos por meio de nossa plataforma conectada
                ao sistema da STEAM para o jogo Counter-Strike: Global
                Offensive.{' '}
              </li>
              <br />
              <li>
                1.2. &quot;<span className="underline">Usuário</span>&quot;
                refere-se a qualquer pessoa física que utilize nossos serviços
                por meio da nossa plataforma.
              </li>
              <br />
              <li>
                1.2.1. Só poderá ser usuário aquele que já tiver 18 anos
                completos no momento do cadastro junto a plataforma. Menores de
                18 anos não terão o acesso para efetuar negociações.
              </li>
              <br />
              <li>
                1.3. &quot;<span className="underline">Skins</span>&quot;
                refere-se aos itens virtuais, como armas, personagens ou outros
                objetos de personalização, utilizados em jogos eletrônicos.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DOS SERVIÇOS OFERECIDOS
            </Common.Title>
            <ol>
              <li>
                2.1. A RentSkins é originalmente uma plataforma de intermediação
                de venda e compra de itens digitais (marketplace) que permite
                aos usuários negociar skins de jogos eletrônicos que forem
                disponibilizados entre os usuários, não caracterização como uma
                loja ou comércio eletrônico propriamente dito.
              </li>
              <br />
              <li>
                2.2. A RentSkins serve como uma base de conexão entre o usuário
                que pretende anunciar seus itens digitais &quot;skins&quot; pelo
                preço desejado; vender os itens diretamente para a RentSkins e
                realizar a compra de itens anunciados por outros usuários.
              </li>
              <br />
              <li>
                2.3. Tenha em mente que a plataforma é voltada para o público
                brasileiro, residente ou não no país, onde fica determinado que
                a responsabilidade de plataforma está restrita a legislação
                nacional, não estão vinculadas as demais legislações de outros
                países e, portanto, não sendo recomendado seu uso por público
                estrangeiro.
              </li>
              <br />
              <li>
                2.4. De igual forma, devemos esclarecer que a negociação de
                skins envolve riscos inerentes, incluindo, mas não se limitando
                a: variações de preços, perdas financeiras e fraudes. A empresa
                auxilia o contato entre usuários, mas não se responsabiliza por
                quaisquer danos ou prejuízos decorrentes da negociação de skins,
                uma vez que o controle do inventário e da forma de condução das
                negociações não são o alvo da efetivação de uma compra ou
                locação.
              </li>
              <br />
              <li>
                2.5. Os itens que estiverem anunciados na plataforma são
                trazidos por usuários, não pertencendo a RentSkins, dessa forma,
                não nos responsabilizamos por alterações de preços, reservas de
                itens ou bloqueio de itens em nossas operações pela Steam.
              </li>
              <br />
              <li>
                2.6. A RentSkins não possui qualquer vínculo de afiliação com a
                Steam ou a Valve.
              </li>
              <br />
              <li>
                2.7. Por estar ciente do presente termo, o usuário concorda que
                quaisquer garantias, direitos ou obrigações ou demais relações
                contratuais que você possa ter junto ao sistema da Steam e da
                Valve fazem parte do presente documento e se aplicam na
                integralidade dos aspectos supracitados.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DO REGISTRO E DA CONTA DO USUÁRIO
            </Common.Title>
            <ol>
              <li>
                3.1. Para que possa utilizar nossos serviços de intermediação, o
                usuário deverá realizar o cadastro em nossa plataforma,
                fornecendo as informações precisas, atualizadas e completas.
              </li>
              <br />
              <li>
                3.2. De igual forma, a fim de respeitar as leis de proteção de
                dados, os usuários podem pedir acesso ao registro cadastral,
                caso haja a necessidade de atualização cadastral.
              </li>
              <br />
              <li>
                3.2.1. No caso de alteração de algum dos dados informados
                previamente no cadastro, sugerimos que imediatamente atualize
                seus dados para que possamos garantir a integridade da conta de
                usuário.
              </li>
              <br />
              <li>
                3.3. O usuário é responsável por manter a confidencialidade de
                suas informações de login e senha de acesso, sendo inteiramente
                responsável por todas as atividades que forem realizadas em sua
                conta, restringindo este acesso para manter os parâmetros de
                segurança necessários.
              </li>
              <br />
              <li>
                3.3.1. Caso haja percebido uma movimentação diversa que possa
                sugerir uma tentativa de sequestro de conta ou invasão, entre em
                contato com a plataforma pelo seu acesso, modificando sua senha
                e elaborando uma autenticação de dois fatores (2FA
                Authentication) para criar uma camada de segurança ao seu
                cadastro e seu inventário disponibilizado para negociação.
              </li>
              <br />
              <li>
                3.4. Os dados cadastrais “e-mail” e “número de telefone” têm
                como função de ferramentas de validação e autenticação a fim de
                gerar maior segurança nas tomadas de decisão. O dado de
                &quot;Trade URL&quot; da Steam também é um dado cadastral que
                irá permitir o uso total dos serviços da plataforma.
              </li>
              <br />
              <li>
                3.5. Mediante solicitação é direito de todo e qualquer usuário
                de encerrar sua conta a qualquer momento, basta enviar um e-mail
                para o endereço de suporte: suporte@rentskins.com com as
                informações de cadastro no site para remoção permanente.
              </li>
              <br />
              <li>
                3.5.1. A remoção da conta não remove os dados recolhidos de
                imediato, somente o cadastro, uma vez que os dados serão
                excluídos em decorrência temporal do fim dos prazos legais da
                Lei Geral de Proteção de Dados.
              </li>
              <br />
              <li>
                3.6. O Atendimento ao Usuário será feito nos horários
                comerciais, em regra, para atender os pedidos e questionamentos
                para seus usuários, tendo em mente que todo e qualquer e-mail
                enviado terá no prazo máximo de até 03 dias úteis de ser
                completamente respondido.
              </li>
              <br />
              <li>3.6.1. O Atendimento ao Usuário é por chat ou por e-mail.</li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA CONDUTA DO USUÁRIO
            </Common.Title>
            <ol>
              <li>
                4.1. Ao utilizar nossos serviços, o usuário concorda em tomar as
                condutas mais adequadas, a fim de estabelecer boa-fé entre os
                usuários e a plataforma da RentSkins e, portanto, o usuário
                precisa concordar em realizar as seguintes condutas:{' '}
              </li>
              <br />
              <li>
                4.1.1. Não violar as regras ambientais e regulamentos da
                RentSkins, bem como não violar as leis que regem esse termo de
                uso, bem como não violar o direito de terceiros.{' '}
              </li>
              <br />
              <li>
                4.1.2. Não falsificar identidade ou utilizar informações
                pessoais de terceiros ou ainda utilizar outra informação
                relacionada à negociação de skins.{' '}
              </li>
              <br />
              <li>
                4.1.3. Não participar de atividades fraudulentas, incluindo, mas
                não se limitando a falsificação nas negociações de skins.{' '}
              </li>
              <br />
              <li>
                4.1.4. Não realizar qualquer atividade que possa prejudicar,
                sobrecarregar ou afetar negativamente a infraestrutura da nossa
                plataforma.{' '}
              </li>
              <br />
              <li>
                4.1.5. Não utilizar nossos serviços para qualquer finalidade
                ilegal ou não autorizada.{' '}
              </li>
              <br />
              <li>
                4.1.6. A conduta desonesta, ilegal ou não-autorizada pode
                resultar em suspensão e até banimento da plataforma.{' '}
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DAS TAXAS DE NEGOCIAÇÃO, DE DEPÓSITOS, DE RETIRADAS E DOS PRAZOS
            </Common.Title>
            <ol>
              <li>
                5.1. Por não se tratar de um comércio propriamente dito, toda e
                qualquer atividade na plataforma terá uma taxa básica, sendo que
                na primeira venda na plataforma, independentemente do valor
                destacado do item, a taxa aplicada é de 10%.{' '}
              </li>
              <br />
              <li>
                5.1.1. As taxas pela negociação na modalidade (venda) serão de
                6% enquanto a modalidade (locação) será de 10%.{' '}
              </li>
              <br />
              <li>
                5.1.2. As taxas podem ser alteradas a qualquer momento, caso
                haja a necessidade de alteração dos Termos de Serviço e caso
                ocorra a necessidade de alteração para cumprir atualizações de
                leis do ordenamento jurídico.{' '}
              </li>
              <br />
              <li>
                5.2. Existem as seguintes modalidades de depósito de saldo na
                plataforma:
              </li>
              <br />
              <li>5.2.1. PIX</li>
              <br />
              <li>5.2.2. Boleto Bancário</li>
              <br />
              <li>5.2.3. Cartão de Crédito</li>
              <br />
              <li>5.2.4. MercadoPago</li>
              <br />
              <li>
                5.3. Após a venda de um item em nossa plataforma, o usuário pode
                solicitar a retirada de seu saldo para conta bancária via PIX,
                sendo cobrada uma taxa fixa de 2% sobre o valor do saque a ser
                efetuado, mantendo por conhecimento que o mínimo para a
                solicitação do saque é de R$ 20,00 (vinte reais.){' '}
              </li>
              <br />
              <li>
                5.3.1. As taxas e demais valores podem ser alteradas a qualquer
                momento, com a alteração dos Termos de Serviço.{' '}
              </li>
              <br />
              <li>
                5.4. Os prazos para a compensação de quaisquer depósitos
                efetuados e processamento de saques solicitados na plataforma,
                segue um padrão previamente adequado que funciona da seguinte
                forma:{' '}
              </li>
              <br />
              <li>5.4.1. PIX – Até 1 dia útil</li>
              <br />
              <li>5.4.2. Cartão de Crédito - Até 1 dia útil</li>
              <br />
              <li>5.4.3. Mercado Pago - Até 1 dia útil </li>
              <br />
              <li>5.4.4. Boleto bancário -em até 3 dias úteis</li>
              <br />
              <li>5.4.5. Saques - Até 1 dia útil.</li>
              <br />
              <li>
                5.5. Os padrões previamente citados nas negociações têm por
                objetivo respeitar as regras convencionadas seja pela empresa,
                seja pelo ordenamento jurídico e pelas plataformas de pagamento.
              </li>
              <br />
              <li>
                5.6. Os prazos não são considerados quando houver erro de
                preenchimento ou falhas de responsabilidade do usuário, podendo
                ser alterados a qualquer momento, com a alteração dos Termos.{' '}
              </li>
              <br />
              <li>
                5.6.1. A RentSkins pode solicitar informações complementares
                antes de adicionar o saldo após o depósito. Uma vez que o
                usuário não comprove as informações solicitadas, o valor será
                devolvido para a conta de origem.{' '}
              </li>
              <br />
              <li>
                5.7. A RentSkins não é responsável por atrasos no pagamento ou
                ações do respectivo provedor de serviços de pagamento pois entre
                o método escolhido e o usuário que utiliza o serviço são regidos
                por acordos diversos pela norma jurídica nacional, não sendo
                sujeitos a estes termos de uso.{' '}
              </li>
              <br />
              <li>
                5.8. A RentSkins não é responsável por negociações efetuadas
                utilizando-se de métodos de pagamentos feitos por familiares do
                usuário, bem como uso de cartões clonados e demais tipos de
                conduta inadequada, entretanto a mesma se compromete a
                disponibilizar todas as informações que estiverem ao alcance
                para auxiliar o terceiro prejudicado nessa negociação.{' '}
              </li>
              <br />
              <li>
                5.9. A RentSkins não possui relação com as taxas cobradas por
                bandeiras de cartão de crédito, do sistema de pagamento do
                MercadoPago ou qualquer outra forma de pagamento que seja
                disponibilizada pela plataforma. É de responsabilidade do
                usuário conhecer ou buscar a informação necessária sobre o custo
                financeiro de cada operação junto a empresa que for objeto de
                escolha para pagamento antes de realizar o depósito.
              </li>
              <br />
              <li>
                5.10. É de responsabilidade do usuário o preenchimento correto
                de todos os campos de informação de depósito e retirada de forma
                correta. A RentSkins não se responsabiliza por eventuais atrasos
                nas operações ou até mesmo saque para conta não pertencente ao
                usuário, uma vez que esse preenchimento de informações é único e
                delimitado ao próprio usuário realizá-lo da forma adequada.
              </li>
              <br />
              <li>
                5.11. O Saldo na conta criada junto a plataforma RentSkins, não
                pode ser vendido, nem trocado, nem transferido para outro
                serviço e nem mesmo acumula juros.{' '}
              </li>
              <br />
              <li>
                5.12. Frisa-se uma vez que a conduta fraudulenta ou criminosa
                para utilização da plataforma (como pagamentos oriundos de
                cartões clonados ou de terceiros sem a devida autorização
                prévia) terão suas contas permanentemente bandidas da RentSkins
                sem prejuízo das demais sanções aplicáveis do ordenamento
                jurídico nacional.{' '}
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA PROPRIEDADE INTELECTUAL
            </Common.Title>
            <ol>
              <li>
                6.1. Todo o conteúdo disponibilizado na plataforma, incluindo,
                mas não se limitando aos textos, gráficos, logotipos, imagens e
                software, é de propriedade exclusiva da empresa ou dos devidos
                licenciadores, portanto, encontra-se protegido por leis de
                direitos autorais e leis de propriedade intelectual.{' '}
              </li>
              <br />
              <li>
                6.2. Ao utilizar os serviços da plataforma, o usuário concorda
                em não reproduzir, distribuir, modificar, criar obras derivadas
                ou ainda explorar comercialmente qualquer parte do conteúdo
                disponibilizado em nossa plataforma, sem autorização prévia, por
                escrito, da empresa.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA COMPRA E VENDA DE ITENS (SKINS)
            </Common.Title>
            <ol>
              <li>
                7.1. Todo e qualquer usuário cadastrado deve ter o sistema de
                segurança e autenticação de 2 fatores da Steam, o &quot;Steam
                Guard&quot;, ativo com aplicativo instalado em seu celular.
              </li>
              <br />
              <li>
                7.2. Se por falta do Steam Guard o usuário não consiga retirar
                os itens comprados pela plataforma, a responsabilidade não nos
                será abordada pois esse aplicativo é essencial para validação
                das negociações.
              </li>
              <br />
              <li>
                7.3. Para o adequado anúncio dos itens na plataforma, os itens
                ficam no inventário do proprietário até o momento da solicitação
                de troca.
              </li>
              <br />
              <li>
                7.4. A RentSkins não se responsabiliza por quaisquer violações
                de segurança na conta Steam dos usuários, sendo de integral
                responsabilidade o resultado de tentativas e êxitos de sites e
                outros sistemas maliciosos que visem a roubar seus dados ou
                itens da Steam. Como exemplo tradicional temos o &quot;API
                Scam.&quot;
              </li>
              <br />
              <li>
                7.5. As negociações devem seguir um comportamento adequado de
                ajuste, não havendo a participação de BOTs ou intermediários,
                devendo os itens serem mantidos com os próprios usuários.{' '}
              </li>
              <br />
              <li>
                7.6. Os valores dos itens podem ser modificados a qualquer
                período pelo usuário que for possuidor do item anunciado.{' '}
              </li>
              <br />
              <li>
                7.7. A RentSkins não possui qualquer conexão com itens
                anunciados no site, não se responsabilizando por perdas ou
                bloqueios durante o anúncio e/ou compra.{' '}
              </li>
              <br />
              <li>
                7.8. Com o intuito de proteger a comunidade e nossos usuários de
                serem induzidos a erros, a RentSkins tem o direito de remover
                temporária ou indefinidamente os anúncios que possuam preços
                fora da realidade do mercado. A incompatibilidade de valores é
                de análise da RentSkins, não existindo a necessidade de
                justificativa para tal. Em caso de tentativas sucessivas neste
                mesmo sentido, com valores incompatíveis, após a remoção,
                poderão ter o acesso a RentSkins bloqueados.{' '}
              </li>
              <br />
              <li>
                7.9. Os itens relativos ao seu ID na plataforma são
                intransferíveis para outro usuário de ID diferente, com exceção
                de uma venda realizada.{' '}
              </li>
              <br />
              <li>
                7.10. Os usuários podem vender diretamente seus itens para a
                RentSkins (modalidade instantânea) sem que sejam incididas
                quaisquer taxas de venda. Essa modalidade de venda pratica
                valores que não são negociáveis nem de escolha do usuário.{' '}
              </li>
              <br />
              <li>
                7.11. A taxa de 2% para saque do valor proveniente de venda
                instantânea permanece.{' '}
              </li>
              <br />
              <li>
                7.12. A RentSkins tem direito de forma inconteste, a determinar
                quais itens e valores podem ser pagos por eles nesta modalidade
                de venda.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA PROTEÇÃO CONTRA FRAUDES
            </Common.Title>
            <ol>
              <li>
                8. Como forma de cumprimento das regras, a RentSkins repassa
                toda e qualquer informação adequada com relação aos riscos no
                envio de itens para o site, de modo que a ocorrência de API Scam
                é decorrente da conta Steam estar corrompida. E caberá ao
                usuário tomar as condutas de segurança básica, de forma
                recorrente e periódica, a fim de evitar essas situações. Então,
                a responsabilidade acerca da segurança nesse aspecto, não
                corresponde a RentSkins, pois repassamos as informações, mas não
                podemos nos sujeitar aos impactos que surgem de ausência do
                cuidado constante de sua conta Steam.{' '}
              </li>
              <br />
              <li>
                8.1. De forma que além do citado acima, cabe dizer que pela
                RentSkins não ter acesso algum a conta Steam dos usuários, não
                existe forma de armazenamento de dados que viabilizem condutas
                fraudulentas.{' '}
              </li>
              <br />
              <li>
                8.2. Para critério de parceria com nossos usuários, nós sempre
                indicaremos a verificação temporal da verificação da chave API
                de sua conta Steam, no site:
                https://steamcommunity.com/dev/apikey.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA DEVOLUÇÃO, TROCA DE ITENS E/OU REEMBOLSO
            </Common.Title>
            <ol>
              <li>
                9. A RentSkins não realiza reembolso, devolução ou troca de
                itens:
              </li>
              <br />
              <li>
                9.1. Existe acesso total aos dados que configuram o item
                anunciado a plataforma, não havendo margem para incerteza,
                dubiedade ou impropriedade. As descrições são suficientes para
                que não haja erro na escolha do item.
              </li>
              <br />
              <li>
                9.2. Sabemos do questionamento de aplicação do Art. 49 do Código
                de Defesa do Consumidor, entretanto é necessário ressaltar que a
                previsão legal protege o consumir de comprar produtos físicos
                que não preencham as expectativas ou não condizem com o
                anunciado no momento da entrega.{' '}
              </li>
              <br />
              <li>
                9.2.1. Os itens que estão à venda no site possuem total
                especificidade, de forma que o usuário tem completa noção da
                qualidade, durabilidade e demais detalhes que justificam que há
                uma concordância e compreensão de que o produto é conforme o
                objetivado para comprar, portanto o direito de arrependimento
                não deverá prosperar, pois há total ciência do item que estiver
                negociando.{' '}
              </li>
              <br />
              <li>
                9.3. Não existe vício oculto ou aparente na compra dos itens
                pois há ciência total do que está comprando e suas
                especificações.{' '}
              </li>
              <br />
              <li>
                9.4. Os itens não são de propriedade da RentSkins, sendo os
                itens apenas dos usuários cadastrados e a plataforma é apenas um
                local onde os usuários demonstram seus inventários em
                disponibilidade para negociação.{' '}
              </li>
              <br />
              <li>
                9.5. A RentSkins não se responsabiliza caso o usuário compre ou
                venda um item por engano, sendo obrigação de observância dos
                próprios usuários de verificar todas as informações antes de
                colocar para a venda ou efetuar a compra.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DOS DIREITOS DA RENTSKINS
            </Common.Title>
            <ol>
              <li>
                10.1. É direito da RentSkins recusar qualquer troca de qualquer
                item virtual.
              </li>
              <br />
              <li>
                10.2. A RentSkins não pode reverter uma troca de item virtual,
                pois a Steam não gera a permissão específica para o tipo de
                interação com a conta do usuário final.
              </li>
              <br />
              <li>10.3. É direito da RentSkins de igual forma:</li>
              <br />
              <li>
                10.3.1. Modificar, suspender ou descontinuar o serviço, site ou
                conteúdo relacionado ou recursos ou promoções com sem aviso
                prévio de 60 dias.{' '}
              </li>
              <br />
              <li>
                10.3.2. Inserir ou modificar recursos para a plataforma, sem
                qualquer motivo, sem qualquer questionamento e sem que isso gere
                direito à reclamação futura.
              </li>
              <br />
              <li>
                10.3.3. Realizar todas as ações que julgar apropriadas em
                resposta as violações comprovadas ou suspeitas das condutas
                reprovadas pelo presente termo, incluindo, mas não somente
                limitando à suspensão, rescisão do acesso ou até mesmo o
                banimento.{' '}
              </li>
              <br />
              <li>
                10.3.4. Alterar as taxas do site, sem aviso prévio, mediante
                alteração dos termos de uso.{' '}
              </li>
              <br />
              <li>
                10.3.5. Alterar as formas de depósito e saques mediante aviso
                determinado nos termos de uso.
              </li>
              <br />
              <li>
                10.3.6. Modificar os termos de serviço, sem aviso prévio.{' '}
              </li>
              <br />
              <li>
                10.3.7. Restringir o acesso a plataforma do usuário que
                demonstrar conduta e comportamento desrespeitoso inadequado a
                qualquer membro da equipe.{' '}
              </li>
              <br />
              <li>
                10.3.7.1. É motivo de banimento qualquer comportamento que se
                assemelha ou iguala-se a conduta discriminatória, seja por
                questões de sexualidade, étnicas, religiosas e demais condutas
                que sejam amplamente inadequadas no meio social.{' '}
              </li>
              <br />
              <li>
                10.3.8. Remover da aba de anúncios os itens que estejam com
                preços inflados e incompatíveis com a realidade do mercado
                praticado.
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DA LIMITAÇÃO DE RESPONSABILIDADE
            </Common.Title>
            <ol>
              <li>
                11.1. A empresa não se responsabiliza por quaisquer danos ou
                prejuízos decorrentes do uso de nossos serviços, incluindo, mas
                não se limitando a, perdas financeiras, danos diretos,
                indiretos, incidentais, especiais, punitivos ou consequenciais.{' '}
              </li>
            </ol>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DAS DISPOSIÇÕES GERAIS
            </Common.Title>
            <ol>
              <li>
                12.1. A empresa reserva-se o direito de modificar os serviços a
                qualquer tempo, bem como encerrar suas atividades, mediante
                aviso prévio de 60 dias.
              </li>
              <br />
              <li>
                12.2. O presente termo é regido e interpretado em conformidade
                com as leis Brasileiras.{' '}
              </li>
              <br />
              <li>
                12.3. Qualquer controvérsia decorrente do presente termo será
                submetida à jurisdição dos tribunais brasileiros.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  )
}
