import Common from '@/components/Common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacidade - RentSkins',
  description: `Rentskins é a melhor plataforma para comprar, vender e alugar skins do CS:GO.
  Encontre skins raras e exclusivas para personalizar seu jogo.`,
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
              A RentSkins, pessoa jurídica de direito privado, com sede na Rua
              Fulano de Tal, nº 123, inscrita no CNPJ/MF sob o nº
              111111111111111111 (“Lojista” ou “nós”) leva a sua privacidade a
              sério e zela pela segurança e proteção de dados de todos os seus
              clientes, parceiros, fornecedores e usuários (“Usuários” ou
              “você”) do site “rentskins.com.br” e qualquer outro site, Loja,
              aplicativo operado pelo Lojista (aqui designados, simplesmente,
              “Loja”).
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
              Pessoais, entre em contato com e-mail.institucional@rentskins.com
              (e-mail que vai ser criado por você)
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
            <Common.Title bold={700} color="white" className="mb-8 text-2xl">
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
              1.1) Das Informações Coletadas
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
              1.2) Das Informações Coletadas Automaticamente
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
              <ol>
                <li>
                  <p>
                    1. Uso de cookies: Os cookies permitem a coleta de
                    informações tais como o tipo de navegador, o tempo
                    dispendido na Loja, as páginas visitadas, as preferências de
                    idioma, e outros dados de tráfego anônimos. Nós e nossos
                    prestadores de serviços podemos utilizar essas informações
                    para, dentre outros, personalizar sua experiência ao
                    utilizar a Loja, assim como para direcionar publicidade para
                    você, de acordo com os seus interesses.
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
                    "opções" ou "preferências" do seu navegador.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
