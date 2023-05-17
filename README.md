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

app/\
├── controllers        \
├── models             \
├── templates          \
│   ├── base.html       \
│   ├── pages          \
│   └── components     \
├── static             \
├── extensions.py       \
├── routes.py           \
└── app.py              



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
