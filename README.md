# Blog Podcast

Este é um projeto de blog para compartilhamento de episódios de podcast. O objetivo é fornecer uma plataforma onde os autores podem publicar seus podcasts e os usuários podem ouvi-los.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- Python: Linguagem de programação utilizada para desenvolver a aplicação.
- Flask: Framework web utilizado para criar a aplicação em Python.
- MySQL: Banco de dados utilizado para armazenar as informações dos podcasts e autores.
- Flask-Migrate: Extensão do Flask utilizada para realizar migrações do banco de dados.
- Flask-WTF: Extensão do Flask utilizada para lidar com formulários.
- Jinja2: Engine de template utilizada para renderizar as páginas HTML.
- Bootstrap: Framework de CSS utilizado para estilizar a interface do usuário.

## Estrutura do projeto

O projeto está organizado da seguinte forma:

app/

├── controllers/          # Contém os controladores da aplicação
├── models/               # Contém as definições dos modelos de dados
├── templates/            # Contém os arquivos de template HTML
│   ├── base.html         # Template base comum a todas as páginas
│   ├── pages/            # Templates específicos de cada página
│   └── components/       # Componentes reutilizáveis
├── static/               # Arquivos estáticos (CSS, JavaScript, imagens)
├── extensions.py         # Extensões utilizadas pela aplicação
├── routes.py             # Rotas da aplicação
└── app.py                # Arquivo principal que cria a instância do Flask


## Executando a aplicação

Para executar a aplicação, siga as etapas abaixo:

1. Certifique-se de ter o Python instalado em sua máquina.
2. Clone o repositório do projeto.
3. Acesse o diretório do projeto.
4. Crie e ative um ambiente virtual (opcional, mas recomendado). Exemplo:

python3 -m venv venv
source venv/bin/activate

5. Instale as dependências do projeto: `pip install -r requirements.txt`.
6. Configure as variáveis de ambiente necessárias, como a URL do banco de dados.
7. Execute as migrações do banco de dados: `flask db upgrade`.
8. Inicie a aplicação: `flask run`.
9. Acesse a aplicação em seu navegador, através do endereço `http://localhost:5000`.

## Contribuindo

Se você quiser contribuir para o desenvolvimento deste projeto, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Clone o seu fork para a sua máquina local.
3. Crie uma branch para a sua feature ou correção: `git checkout -b minha-feature`.
4. Faça as alterações desejadas no código.
5. Faça commit das suas alterações: `git commit -m "Minha feature"`.
6. Faça push para o repositório remoto: `git push origin minha-feature`.
7. Abra um pull request no repositório original.
