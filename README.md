# clone-tabnews

Recriar o site do tabnews.com.br para o curso.dev

## Docker
Iniciar container do banco de dados (local):

```bash
docker compose -f infra/compose.yaml up -d
```

## Scripts
Executar em modo desenvolvimento:

```bash
npm run dev
````

Verificar se os arquivos estão com a formatação padrão:

```bash
npm run lint:check
````

Aplicar a formatação padrão nos arquivos:

```bash
npm run lint:fix
````

Executar testes unitários:

```bash
npm run test
````

Executar testes unitários em watch mode:

```bash
npm run test:watch
````
