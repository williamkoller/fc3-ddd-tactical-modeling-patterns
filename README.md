[![Continuous Integration](https://github.com/williamkoller/fc3-ddd-tactical-modeling-patterns/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/williamkoller/fc3-ddd-tactical-modeling-patterns/actions/workflows/continuous-integration.yml)

# Full Cycle 3.0

## DDD: Modelagem Tática e Patterns

### Elementos Táticos

- Quando estamos falando sobre DDD e precisamos olhar mais a hundo um Bounded Context.
- Precisamos ser capazes de ,odlarmos de forma mais assertive nos seus principais
  components, comportamento e individualidades, bem como seus relações.

### Entities

- Uma entidade é algo único que é capaz de forma contínua durante um longo período de tempo.

- Uma entidae é algo que possui uma continuidade em seu ciclo de vida e
  pode ser distinguida independete dos atributos que são importantes para a aplicação do usuário.
  Pode ser uma pessoa, cidade, carro, um ticket de loteria ou uma transação bancária.

Domain

- Entities
  - customer.ts (regra de negócio)

Infra - mundo externo

- Entities / Models
  - customer.ts (get, set)

### Value Objects

- Quando você se preocupa apneas com os atributos de um elemento de um
  model, classique-o como um Value Object.

- Trate o Value Object como um objeto imutável, ou seja, uma vez que ele é criado, ele não pode ser alterado.

Address:

- street
- city
- state
- zipCode

# Aggregates

- Um Agregado é um conjunto de objetos associados que tratamos
  como uma unidade para o propósito de mudança de dados.

<p align="center">
  <a href="">
    <img src="./resources/aggragates.drawio.png">
  </a>
</p>

# Domain Services
- Um serviço de domínio é uma operação que cumpre uma tarefa
 específica do domínio. Muitas vezes, a melhor indicação de que você deve
 criar um serviço no modelo de domínio é quando a operação que você
 precisa executar parace não se encixar como um método de um Agregador
 (10) ou um Objeto de Valor (6).

- Quando um processo ou transformação significativa no domínio não for uma
responsabilidade natural da **entidade** ou **objeto de valor**, adicione
uma operação ao modelo como uma interface autonôma declarada como um
**serviço**. Define a interface baseada na linguagem do modelo de domínio e 
certifique-se de que o nome da operação façá parte do **obiquitous language**.
Torne o **serviço** sem estado.

- Uma entidade pode realizar uma ação que vai afetar todas as entidades?
- Como realizar uma operação em lote?

- Cuidados:
  - Quando houver muitos Domain Services em seu projeto, **talvez**, isso pode
  indicar que seus agragados estão anêmicos.
  - Domain Services são Stateless