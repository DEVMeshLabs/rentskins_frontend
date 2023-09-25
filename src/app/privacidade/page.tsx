import Common from '@/components/Common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO. Encontre skins raras e exclusivas para personalizar seu jogo.`,
}

export default function Privacidade() {
  return (
    <main className="w-full bg-mesh-color-others-black">
      <div className="mx-auto w-8/12 py-10">
        <Common.Title
          bold={700}
          color="white"
          className="flex justify-center text-center text-5xl"
        >
          Política de Privacidade
        </Common.Title>

        <div className="mt-8 space-y-10 pb-20 text-justify leading-tight text-neutral-200">
          <div>
            <p>
              A RentSkins, pessoa jurídica de direito privado, com sede na
              <span className="font-bold text-red-500">
                {' '}
                Rua Fulano de Tal, nº 123
              </span>
              , inscrita no CNPJ/MF sob o nº
              <span className="font-bold text-red-500">
                {' '}
                111111111111111111
              </span>{' '}
              (“Lojista” ou “nós”) leva a sua privacidade a sério e zela pela
              segurança e proteção de dados de todos os seus clientes,
              parceiros, fornecedores e usuários (“Usuários” ou “você”) do site
              “rentskins.com.br” e qualquer outro site, Loja, aplicativo operado
              pelo Lojista (aqui designados, simplesmente, “Loja”).
            </p>
            <br />
            <p>
              Esta Política de Privacidade (“Política de Privacidade”)
              destina-se a informá-lo sobre o modo como nós utilizamos e
              divulgamos informações coletadas em suas visitas à nossa Loja e em
              mensagens que trocamos com você (“Comunicações”).
            </p>
            <br />
            <p>
              AO ACESSAR A LOJA, ENVIAR COMUNICAÇÕES OU FORNECER QUALQUER TIPO
              DE DADO PESSOAL, VOCÊ DECLARA ESTAR CIENTE E DE ACORDO COM ESTA
              POLÍTICA DE PRIVACIDADE, A QUAL DESCREVE AS FINALIDADES E FORMAS
              DE TRATAMENTO DE SEUS DADOS PESSOAIS QUE VOCÊ DISPONIBILIZAR NA
              LOJA.
            </p>
            <br />
            <p>
              Esta Política de Privacidade fornece uma visão geral de nossas
              práticas de privacidade e das escolhas que você pode fazer, bem
              como direitos que você pode exercer em relação aos Dados Pessoais
              tratados por nós. Se você tiver alguma dúvida sobre o uso de Dados
              Pessoais, entre em contato com{' '}
              <span className="font-bold text-red-500">
                {' '}
                email@exemplo.com{' '}
              </span>
              .
            </p>
            <br />
            <p>
              Este é o primeiro documento sobre a política de privacidade da
              empresa Rent Skins, sediada em rua, bairro, cidade, Brasil. E para
              emitir essa política de privacidade, nós usamos como medida
              primeira o comprometimento de respeitar as regras da Lei 13.709 de
              2018 que versa sobre a proteção de dados.
            </p>
            <br />
            <p>
              Além disso, a Política de Privacidade não se aplica a quaisquer
              aplicativos, produtos, serviços, site ou recursos de mídia social
              de terceiros que possam ser oferecidos ou acessados por meio da
              Loja. O acesso a esses links fará com que você deixe a Loja e
              possa resultar na coleta ou compartilhamento de informações sobre
              você por terceiros. Nós não controlamos, endossamos ou fazemos
              quaisquer representações sobre esses sites de terceiros ou suas
              práticas de privacidade, que podem ser diferentes das nossas.
              Recomendamos que você revise a política de privacidade de qualquer
              site com o qual você interaja antes de permitir a coleta e o uso
              de seus Dados Pessoais.
            </p>
          </div>

          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-xl">
              1. Definições
            </Common.Title>
            <p>
              <b> Dados Pessoais </b> significa qualquer informação que, direta
              ou indiretamente, identifique ou possa identificar uma pessoa
              natural, como por exemplo, nome, CPF, data de nascimento, endereço
              IP, dentre outros;
            </p>
            <br />
            <p>
              <b> Dados Pessoais Sensíveis </b> significa qualquer informação
              que revele, em relação a uma pessoa natural, origem racial ou
              étnica, convicção religiosa, opinião política, filiação a
              sindicato ou a organização de caráter religioso, filosófico ou
              político, dado referente à saúde ou à vida sexual, dado genético
              ou biométrico;
            </p>
            <br />
            <p>
              <b> Tratamento de Dados Pessoais </b> significa qualquer operação
              efetuada no âmbito dos Dados Pessoais, por meio de meios
              automáticos ou não, tal como a recolha, gravação, organização,
              estruturação, armazenamento, adaptação ou alteração, recuperação,
              consulta, utilização, divulgação por transmissão, disseminação ou,
              alternativamente, disponibilização, harmonização ou associação,
              restrição, eliminação ou destruição. Também é considerado
              Tratamento de Dados Pessoais qualquer outra operação prevista nos
              termos da legislação aplicável;
            </p>
            <br />
            <p>
              <b> Leis de Proteção de Dados </b> significa todas as disposições
              legais que regulem o Tratamento de Dados Pessoais, incluindo,
              porém sem se limitar, a Lei nº 13.709/18, Lei Geral de Proteção de
              Dados Pessoais <b> (LGPD) </b>.
            </p>
            <br />
            <p>
              Em nosso primeiro contato com o público, desde já agradecemos pela
              confiança ao escolher utilizar os serviços da RENTSKINS. A
              privacidade dos nossos usuários é prioritária, não somente pelas
              questões legais, mas pelo intuito de proteger nosso maior
              patrimônio: o utilizador.
            </p>
            <br />
            <p>
              Esta política de privacidade tem como intuito descrever como
              coletamos, usamos, compartilhamos quando adequado e mantemos suas
              informações protegidas a partir do momento que o utilizador passa
              a fornecer quando acessa nossos serviços.
            </p>
          </div>

          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              INFORMAÇÕES COLETADAS
            </Common.Title>
            <Common.Title bold={700} color="white" className="mb-4 text-xl">
              1.1) <b className="underline"> Das Informações Coletadas </b>
            </Common.Title>
            <div className="ml-9">
              <p>
                Quando você se cadastra para utilizar nossos serviços, a
                qualquer tempo, podemos solicitar e coletar as seguintes
                informações pessoais:
              </p>
              <br />
              <ol>
                <li>1. Nome Completo</li>
                <li>2. Endereço de E-mail</li>
                <li>3. Informações de Contato (Endereço, Telefone, etc.)</li>
                <li>4. Informações de Pagamento</li>
                <li>5. Informações de Acesso à Conta</li>
                <li>6. Preferências e Configurações de utilizador\Usuário</li>
                <li>
                  7. Outras Informações Fornecidas Voluntariamente pelo
                  Utilizador\Usuário
                </li>
              </ol>
              <br />
              <p>
                Não haverá coleta de dados pessoais consideráveis pela
                legislação como sensíveis, pois não há necessidade na utilização
                de nossos serviços que demandem este tipo de conhecimento, de
                tal forma, não haverá nenhum nível de preparo de tratamento de
                dados por ser dispensada a obrigatoriedade em questão.{' '}
              </p>
            </div>

            <Common.Title bold={700} color="white" className="my-4 text-xl">
              1.2){' '}
              <b className="underline">
                {' '}
                Das Informações Coletadas Automaticamente{' '}
              </b>
            </Common.Title>
            <div className="ml-9">
              <p>
                Quando você concorda com o preenchimento do cadastro, ao
                utilizar nossos serviços, podemos coletar automaticamente
                informações sobre o seu dispositivo como: Endereço IP, Tipo de
                Navegador, Provedor de Serviços de Internet, Páginas Visitadas e
                Horários de Acesso. Estas informações podem ser coletadas por
                meio de: Cookies, Pixels de Rastreamento e outras tecnologias
                similares.
              </p>
              <br />
              <p>
                Por meio do navegador ou do dispositivo: Algumas informações são
                coletadas pela maior parte dos navegadores ou automaticamente
                por meio de dispositivos de acesso à internet, como o tipo de
                computador, resolução da tela, nome e versão do sistema
                operacional, modelo e fabricante do dispositivo, idioma, tipo e
                versão do navegador de Internet que está utilizando. Podemos
                utilizar essas informações para assegurar que a Loja funcione
                adequadamente.
              </p>
              <br />
              <ol className="ml-9">
                <li>
                  <p>
                    1. <b className="underline">Uso de cookies:</b> Os cookies
                    permitem a coleta de informações tais como o tipo de
                    navegador, o tempo dispendido na Loja, as páginas visitadas,
                    as preferências de idioma, e outros dados de tráfego
                    anônimos. Nós e nossos prestadores de serviços podemos
                    utilizar essas informações para, dentre outros, personalizar
                    sua experiência ao utilizar a Loja, assim como para
                    direcionar publicidade para você, de acordo com os seus
                    interesses.
                  </p>
                  <br />
                  <p>
                    Também coletamos informações estatísticas sobre o uso da
                    Loja para aprimoramento contínuo do nosso design e
                    funcionalidade.
                  </p>
                  <br />
                  <p>
                    Caso não deseje que suas informações sejam coletadas por
                    meio de cookies, você pode configurar os cookies no menu
                    &quot;opções&quot; ou &quot;preferências&quot; do seu
                    navegador.
                  </p>
                </li>
                <br />
                <br />
                <li>
                  <p>
                    2.{' '}
                    <b className="underline">
                      Uso de pixel tags e outras tecnologias similares:
                    </b>{' '}
                    Pixel tags (também conhecidos como Web beacons e GIFs
                    invisíveis) podem ser utilizados para rastrear ações de
                    usuários da Loja (incluindo destinatários de e-mails), medir
                    o sucesso das nossas campanhas de marketing e coletar dados
                    estatísticos sobre o uso da Loja e taxas de resposta. Em
                    caso de ter ativa a personalização de anúncios em
                    ferramentas como Facebook, Google ou Bing, a informação pode
                    ser usada para mostrar anúncios em seus serviços.
                  </p>
                </li>
                <br />
                <br />
                <li>
                  <p>
                    3. Podemos contratar empresas de publicidade comportamental,
                    para obter relatórios sobre os anúncios da Loja em toda a
                    internet. Para isso, essas empresas utilizam cookies, pixel
                    tags e outras tecnologias para coletar informações sobre a
                    sua utilização, ou sobre a utilização de outros usuários, da
                    nossa Loja e de site de terceiros. Nós não somos
                    responsáveis por pixel tags, cookies e outras tecnologias
                    similares utilizadas por terceiros. Você pode configurar
                    suas preferências no menu do seu navegador. Esteja ciente de
                    que se você mudar de computador ou navegador, ou usar vários
                    computadores ou navegadores, você precisará repetir este
                    processo para cada computador e cada navegador.
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              USO DAS INFORMAÇÕES
            </Common.Title>
            <Common.Title bold={700} color="white" className="mb-4 text-xl">
              2.1){' '}
              <b className="underline">
                Da Utilização das Informações Pessoais
              </b>
            </Common.Title>
            <p className="ml-9">
              A utilização e coleta das informações pessoais segue um padrão
              baseado a Lei Geral de Proteção de Dados, que tem por princípio
              respeitar a privacidade do utilizador, mas também serve para
              personalizar nossos serviços, processar as transações e fornecer
              suporte ao utilizador quando for necessário, além de estreitar as
              comunicações sobre sua conta e serviços, além de melhorar e
              otimizar nossos serviços e enviar informações promocionais e de
              marketing, com o seu consentimento.
            </p>
            <Common.Title bold={700} color="white" className="my-4 text-xl">
              2.2){' '}
              <b className="underline">Do Compartilhamento das Informações</b>
            </Common.Title>
            <div className="ml-9">
              <p>
                É justo e necessário indicar que suas informações pessoais podem
                ser compartilhadas com terceiros quando com o seu consentimento
                expresso, para cumprir obrigações legais ou solicitações
                governamentais, para proteger os nossos direitos, propriedade ou
                a segurança ou a de nossos utilizadores, para prestadores de
                serviços terceirizados envolvidos na operação dos nossos
                serviços e na medida das necessidades demonstradas pelas leis em
                âmbito geral.{' '}
              </p>
              <br />
              <p>
                Quando não houver nenhuma obrigatoriedade legal, a RENTSKINS não
                compartilhará dados dos utilizadores para terceiros, exceto nos
                seguintes casos:{' '}
              </p>
              <br />
              <p>
                a) Com a(s) empresa(s) parceira(s) que você selecionar ou optar
                em enviar os seus dados, dúvidas, perguntas etc., bem como com
                provedores de serviços ou parceiros para gerenciar ou suportar
                certos aspectos de nossas operações comerciais em nosso nome.
                Esses provedores de serviços ou parceiros podem estar
                localizados nos Estados Unidos, na Argentina, no Brasil ou em
                outros locais globais, incluindo servidores para homologação e
                produção, e prestadores de serviços de hospedagem e
                armazenamento de dados, gerenciamento de fraudes, suporte ao
                cliente, vendas em nosso nome, atendimento de pedidos,
                personalização de conteúdo, atividades de publicidade e
                marketing (incluindo publicidade digital e personalizada) e
                serviços de TI, por exemplo;
              </p>
              <br />
              <p>
                b) Com terceiros, com o objetivo de nos ajudar a gerenciar a
                Loja; e
              </p>
              <br />
              <p>
                c) Com terceiros, caso ocorra qualquer reorganização, fusão,
                venda, joint venture, cessão, transmissão ou transferência de
                toda ou parte da nossa empresa, ativo ou capital (incluindo os
                relativos à falência ou processos semelhantes).
              </p>
            </div>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              OBSERVAÇÃO
            </Common.Title>
            <p>
              Além disso, os Dados Pessoais fornecidos também podem ser
              utilizados na forma que julgarmos necessária ou adequada: (a) nos
              termos das Leis de Proteção de Dados; (b) para atender exigências
              de processo judicial; (c) para cumprir decisão judicial, decisão
              regulatória ou decisão de autoridades competentes, incluindo
              autoridades fora do país de residência; (d) para proteger nossas
              operações; (e) para proteger direitos, privacidade, segurança
              nossos, seus ou de terceiros; (f) para detectar e prevenir fraude;
              (g) permitir-nos usar as ações disponíveis ou limitar danos que
              venhamos a sofrer; (h) de outros modos permitidos por lei.
            </p>
            <br />
            <p>
              A NOSSA LOJA NÃO ACEITA CADASTROS DE TERCEIROS, A INSISTÊNCIA
              ACARRETA NO BLOQUEIO PERMANENTE DO IP.{' '}
            </p>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              PROTEÇÃO DAS INFORMAÇÕES
            </Common.Title>
            <Common.Title bold={700} color="white" className="mb-4 text-xl">
              3.1) <b className="underline">Das Medidas de Segurança</b>
            </Common.Title>
            <p className="ml-9">
              Implementamos as medidas de segurança que são apropriadas para
              resguardar suas informações pessoais contra acesso não autorizado,
              divulgação, alteração ou destruição. No entanto, compreenda que
              nenhuma transmissão de dados pela internet ou sistema de
              armazenamento eletrônico é 100% seguro. Essas medidas de segurança
              são aprovadas pelo ordenamento jurídico nacional. Para assegurar
              seus dados, as medidas de segurança utilizadas são: firewalls,
              monitoramento de rede, uso de senhas seguras, verificação
              periódica da segurança de sistemas, sistema de detecção de
              invasões e criptografia SSL (Secure Socket Layer.)
            </p>
            <Common.Title bold={700} color="white" className="my-4 text-xl">
              3.2) <b className="underline">Da Retenção de Dados</b>
            </Common.Title>
            <div className="ml-9">
              <p>
                Suas informações pessoais relevantes serão mantidas pelo tempo
                necessário para o cumprimento dos propósitos descritos nesta
                política de privacidade e para respeitar a Lei Geral de Proteção
                de Dados, pois a lei aplicável delimitará a duração da retenção
                dos dados quando e como forem exigidas.
              </p>
              <br />
              <p>
                Uma vez que o prazo da retenção de dados não for mais legalmente
                necessário, haverá a remoção dos dados de nossa base cadastral
                em caráter permanente ou se mantidos, será realizado o
                tratamento de anonimização, quando forem necessários para o
                desempenho das atividades do nosso serviço.
              </p>
            </div>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              DOS SEUS DIREITOS
            </Common.Title>
            <Common.Title bold={700} color="white" className="mb-4 text-xl">
              4.1) <b className="underline">Acesso e atualização</b>
            </Common.Title>
            <p className="ml-9">
              Você tem o direito de acessar, corrigir ou atualizar suas
              informações pessoais a qualquer momento. Se você desejar exercer
              esse direito, entre em contato conosco utilizando as informações
              fornecidas na seção de contato destacada no site e nos métodos
              disponibilizados. De igual forma, o utilizador tem o direito a
              conhecer o acesso, a alteração, a atualização, a eliminação de
              dados e as limitações de tratamento quando forem determinadas
              pelas regras da LGPD e das demais leis do nosso ordenamento
              jurídico.
            </p>
            <Common.Title bold={700} color="white" className="my-4 text-xl">
              4.2) <b className="underline">Cancelamento da Assinatura</b>
            </Common.Title>
            <p className="ml-9">
              Se você não desejar mais receber nossas comunicações promocionais
              periódicas, poderá cancelar a assinatura (newsletter) seguindo as
              instruções fornecidas nos e-mails ou entrando em contato conosco.
            </p>
            <Common.Title bold={700} color="white" className="my-4 text-xl">
              4.2) <b className="underline">Confidencialidade de Tratamento</b>
            </Common.Title>
            <p className="ml-9">
              É importante tomar ciência de que os dados que é retido para o
              cadastro é tratado de forma confidencial e que as medidas de
              segurança são tomadas a fim de que essas informações sejam
              asseguradas.
            </p>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              MENORES DE IDADE
            </Common.Title>
            <p>
              Nossos serviços não se destinam a menores de 18 anos. Não
              coletamos intencionalmente informações pessoais de menores de
              idade. Se você é pai ou responsável legal e acredita que seu filho
              nos forneceu informações pessoais, entre em contato conosco para
              que possamos remover essas informações de nossos registros.
            </p>
            <br />
            <p>
              A NOSSA LOJA{' '}
              <b className="underline">
                NÃO SE DESTINA A PESSOAS COM MENOS DE 18 (DEZOITO) ANOS
              </b>{' '}
              E PEDIMOS QUE TAIS PESSOAS NÃO NOS FORNEÇAM QUALQUER DADO PESSOAL.
            </p>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              ALTERAÇÕES NAS POLÍTICAS DE PRIVACIDADE
            </Common.Title>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir alterações em nossas práticas de privacidade.
              Recomendamos que você revise esta página regularmente para estar
              ciente de quaisquer atualizações. A continuação do uso de nossos
              serviços após a publicação de alterações nesta Política de
              Privacidade será considerada como aceitação tácita dessas
              alterações. Estas atualizações serão publicadas no site ou pela
              via de e-mail a cada cliente.
            </p>
          </div>
          <div>
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
              CONTATO
            </Common.Title>
            <p>
              Se você tiver alguma dúvida ou preocupação em relação a esta
              Política de Privacidade, entre em contato conosco pelo seguinte
              endereço:
            </p>
            <br />
            <p>
              <b className="underline">Email:</b>{' '}
              <span className="font-bold text-red-500">EMAIL@EXEMPLO.COM</span>
            </p>
            <br />
            <p>
              <b className="underline">Endereço:</b>{' '}
              <span className="font-bold text-red-500">
                EXEMPLO, ENDEREÇO - 123
              </span>
            </p>
            <br />
            <p>
              Estamos comprometidos em proteger sua privacidade e faremos o
              possível para responder a todas as solicitações e resolver
              quaisquer preocupações que você possa ter.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
