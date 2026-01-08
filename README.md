# clone-tabnews

Recriar o site do tabnews.com.br para o curso.dev

## Scripts
- Executar em modo desenvolvimento:
```
npm run dev
````
- Criar e executar o container do banco de dados (local):
```
npm run services:up
```
- Parar a execução do container do banco de dados (local):
```
npm run services:stop
```
- Parar e remover o container do banco de dados (local):
```
npm run services:down
```
- Verificar se os arquivos estão com a formatação padrão:
```
npm run lint:check
````
- Aplicar a formatação padrão nos arquivos:
```
npm run lint:fix
````
- Executar os testes unitários:
```
npm run test
````
- Executar os testes unitários em watch mode:
```
npm run test:watch
````
