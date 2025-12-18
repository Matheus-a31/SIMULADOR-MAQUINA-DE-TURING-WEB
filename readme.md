# Simulador de Máquina de Turing (Web)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Uma aplicação web moderna e responsiva para simular Máquinas de Turing. O projeto permite escrever configurações de máquinas, visualizar a execução passo a passo na fita e acompanhar as transições em um diagrama de estados (autômato) gerado automaticamente.

> **Versão:** 1.0.0

---

## Funcionalidades

* **Editor de Configuração:** Escreva o código da sua máquina diretamente no navegador.
* **Visualização da Fita:** Acompanhe o movimento do cabeçote e a escrita na fita em tempo real.
* **Autômato Visual:** Geração automática do diagrama de estados e transições usando **Mermaid.js**.
* **Controles de Execução:** Rode passo a passo (`Step`) ou execução automática (`Run`) com pausa.
* **Terminal de Logs:** Histórico detalhado de cada operação (Leitura , Escrita , Movimento).
* **Responsividade:** Layout adaptável para Desktop (Dashboard de 3 colunas) e Mobile (Scroll vertical).
* **Página de Tutorial:** Guia integrado explicando a sintaxe e o funcionamento.

---

## Tecnologias Utilizadas

Este projeto foi migrado de uma implementação original em Python para uma arquitetura web moderna:

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática e segurança)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Visualização de Grafos:** [Mermaid.js](https://mermaid.js.org/)
* **Deploy:** Vercel

---

## Instalação e Execução Local

Siga os passos abaixo para rodar o projeto na sua máquina:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Matheus-a31/SIMULADOR-MAQUINA-DE-TURING-WEB.git
    cd turing-simulator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    Abra [http://localhost:3000](http://localhost:3000).

---

## Sintaxe de Configuração 

O simulador aceita uma linguagem simples para definir a máquina. Cole o código na área de texto à esquerda.

### Comandos de Inicialização
* `init <estado>`: Define o estado inicial.
* `accept <estados>`: Define o(s) estado(s) de aceitação (separados por vírgula).
* `fita <conteudo>`: Conteúdo inicial da fita.

### Transições
Formato: `origem, leu, destino, escreveu, direção`

* **Direções:** `>` (Direita) ou `<` (Esquerda).
* **Vazio:** Use `_` (underscore) para representar o símbolo branco/vazio.

### Exemplo Completo (Inversor de Bits)

```text
# Exemplo: Inversor de Bits (0 vira 1, 1 vira 0)
fita 10110
init q0
accept qfim

# Regras
q0, 0, q0, 1, >
q0, 1, q0, 0, >
q0, _, qfim, _, <
