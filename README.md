<p align="center">

  <img alt="License" src="https://img.shields.io/github/license/AndreFWeber/fastfeet">
  <img alt="Commit" src="https://img.shields.io/github/last-commit/AndreFWeber/fastfeet">
  <img alt="Size" src="https://img.shields.io/github/repo-size/AndreFWeber/fastfeet">  
</p>
<br>
<p align="center">
    <img alt="fastfeet" src="https://github.com/AndreFWeber/fastfeet/blob/master/web/fastfeet/src/assets/logo.svg" width="300px" />
</p>
<br>
<p> 
   Fastfeet é uma transportadora fictícia, proposta pela <a href="https://rocketseat.com.br/">Rocketseat</a>, para criar um sistema composto de um backend em Node.js, web em React js e uma aplicação mobile em Reac Native.
</p>
<br>
<h2>
  Back end
</h2>
<p>
    As regras de negócio especificadas para o sistema da fastfeet foram implementadas inteiramente em node js, utilizando banco de dados postgres e redis instanciados no docker. Como resultado, há uma API rest descrita abaixo, e que pode ser testada facilmente utilizando importando o arquivo de configuração JSON do <a href="https://insomnia.rest/download/">Insomnia</a>.
</p>
<p>Para executar este projeto, assume-se que o usuário possui conhecimento das tecnologias descritas acima, e as possui instaladas em seu ambiente de trabalho<p/>
<p> Versões das dependências utilizadas no desenvolvimento </p>

- node v12.18.0
- yarn 1.22.4
- Docker 19.03.11, build 42e35e61f3

</br>
<p>
  Os requisitos do sistema podem ser encontrados nos seguintes links:
</p>

- [Parte 1](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md#desafio-02-iniciando-aplica%C3%A7%C3%A3o)
- [Parte 2](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md#desafio-03-continuando-aplica%C3%A7%C3%A3o)
  
<h4>Executando o back end:</h4>

```
#Clone o repositorio
$git clone https://github.com/AndreFWeber/fastfeet.git
$cd fastfeet/backend

#Container do Redis
$docker run --name redisFastfeet -p 6379:6379 -d -t redis:alpine

#Container do Postgres
$docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres

#É necessário criar a database do fastfeet no postgres
#Abre um terminal para o container
$docker exec -it fastfeet bash

#Dentro do terminal do container:
$psql -U postgres

#Cria a base de dados fastfeet:
$create database fastfeet;

$exit
$exit

$yarn install

#Criar as tabelas
$yarn sequelize db:migrate

#Criar um usuário mock
$yarn sequelize db:seed:all

#Executar o projeto
$yarn dev
```
<h4>Testando o back end:</h4>
<p>A maneira mais rápida de testar a API é utilizando <a href="https://github.com/AndreFWeber/fastfeet/blob/master/backend/INSOMNIA/Insomnia.json">o arquivo de configuração</a> do Insominia disponibilizado no projeto.</p>
<br>
<p>email para login inicial: admin@fastfeet.com </p>
<p> senha: 123456 </p>

<h2>
  Front end
</h2>
<p>
  O front end do projeto foi inteiramente desenvolvido em react js, utilizando os recursos mais atualizados disponiveis para o framework, como hooks além do uso de bibliotecas como Axios, Yup dentre outras. Por fim, é utilizada redux e redux-saga para tirar proveito de todo o poder da arquitetura flux. O resultado pode ser visto abaixo:
</p>

![](https://github.com/AndreFWeber/fastfeet/blob/master/web/docs/webDemo.gif)

</br>
<p>
  Os requisitos para o front end do projetos podem ser encontrados no seguinte link:
</p>

- [Parte 1](https://github.com/Rocketseat/bootcamp-gostack-desafio-09#desafio-09-front-end-do-meetapp)

  
<h4>Executando o front end:</h4>


```
$cd PATH/TO/FASTFEET/web/fastfeet

$yarn install
$yarn start
```

<p>Na tela de login do sistema, as seguinte credenciais podem ser utilizadas, inicialmente:</p>

- login: admin@fastfeet.com
- senha: 123456



<h2>
  Aplicação mobile
</h2>
<p>
  A aplicação mobile foi feita utilizando o React Native, o que a faz ser uma aplicação híbrida, que roda tanto no Android quanto em aparelhos com iOS. Porém, o desenvolvimento e teste foram realizados utilizando apenas o Android.
</p>


</br>
<p>
  Os requisitos para o front end do projetos podem ser encontrados no seguinte link:
</p>

- [Parte 1](https://github.com/Rocketseat/bootcamp-gostack-desafio-10#desafio-10-mobile-do-meetapp)

</br>
<h4>Executando a aplicação mobile:</h4>


```
$cd PATH/TO/FASTFEET/mobile/fastfeet
$yarn install

#Rodar em uma aparelho android conectado via usb
$react-native run-android

#Caso o metro bundle não inicialize sozinho
$yarn start

#Para debug via reactotron
$adb reverse tcp:9090 tcp:9090
```

![](https://github.com/AndreFWeber/fastfeet/blob/master/mobile/docs/mobileDemo.gif)
