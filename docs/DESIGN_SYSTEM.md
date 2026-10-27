# Design System — README de perfil

> Guia de manutenção de [HelioConde/HelioConde](../README.md). O README aparece dentro da interface do GitHub: **não** é uma página independente com CSS/JavaScript próprios.

## Objetivo e princípios

Apresentar rapidamente **quem é Hélio**, mostrar trabalhos concretos e facilitar o acesso ao portfólio, demos e códigos. Preservar a identidade de desenvolvedor web e criador de jogos, com informações factuais sobre o estágio de cada produto.

1. **Clareza antes de decoração:** nenhum efeito animado deve competir com os projetos.
2. **Projetos com contexto:** nome, problema/resultado, tecnologias e pelo menos um link funcional.
3. **Hierarquia previsível:** uma introdução curta, navegação, projetos principais, jogos e links secundários recolhidos.
4. **Acessível por padrão:** texto alternativo nas imagens, títulos sem saltos, links descritivos e navegação também por texto.
5. **Mobile primeiro:** evitar tabelas extensas, grids HTML de largura fixa e parágrafos de links longos.
6. **Sem estatísticas artificiais:** métricas públicas precisam de fonte, referência temporal e revisão.
7. **Sem tecnologias exageradas:** diferenciar o que está implementado do que está apenas planejado.

## Tokens editoriais (Taste Skill)

Estes tokens são **convenções de autoria**, não variáveis CSS executadas no README.

| Token | Regra |
| --- | --- |
| `space.section` | Uma linha em branco entre seções; separador apenas depois da apresentação |
| `space.group` | Uma linha em branco entre título, descrição e metadados |
| `type.hero` | Um único `<h1>`, com nome e saudação breve |
| `type.section` | `##` para os grupos principais; `###` para cada projeto |
| `type.metadata` | Labels em negrito e tecnologias separadas por `·` |
| `surface.feature` | Blocos de destaque feitos com títulos + texto + links (sem CSS adicional) |
| `surface.archive` | `<details>` e `<summary>` para projetos secundários |
| `color.primary` | `#111827` (badges escuros) |
| `color.linkedin` | `#0A66C2` (badge LinkedIn) |
| `color.github` | `#24292F` (badge repositórios) |
| `interaction.focus` | Deixar a indicação de foco para os controles nativos do GitHub; não ocultá-la |
| `motion.preference` | Sem animações automáticas; conteúdo integralmente compreensível sem movimento |

Os tokens de cor representam apenas o **estilo visual dos badges**. O GitHub decide as cores de fundo, os links, o foco e o suporte a temas claro/escuro.

## Componentes documentais (Awesome Design / Image to Code)

### Hero

- Nome e atuação profissional em primeiro plano.
- Proposta de valor curta, sem empilhar dezenas de badges.
- Ações de portfólio, LinkedIn e repositórios com textos alternativos inequívocos.

### Destaque de projeto

Padrão: `### Ícone + Nome — problema/valor`, descrição em até dois parágrafos curtos, tecnologias, links e ressalva de maturidade quando necessária. A imagem só aparece quando agrega compreensão real, com `alt` descritivo e largura limitada pelo GitHub.

### Galeria de projetos

A galeria reúne **imagens reais já documentadas** em `HelioConde/portfolio2.0/img/projects/`. São três fileiras com duas imagens clicáveis por linha, `width="48%"`, alt específico, legenda textual e link para a demonstração/repositório. As imagens se adaptam à largura disponível sem exigir CSS ou JavaScript customizados.

- Prefira JPEGs das capturas públicas; o arquivo PNG de Slimekeepers mostra **arte do menu**, não gameplay.
- A imagem PlayWithEliteItem representa a **página de publicação no Thunderstore**, não gameplay.
- Mantenha o bloco leve: duas imagens por linha, sem duplicar fotos nos destaques abaixo.
- Cada foto deve apontar para a demo ou repositório correspondente e ter uma descrição honesta.
- Confirme o carregamento em mobile, tablet e desktop com Playwright, sem depender de imagens externas opacas ou de GIFs.
- [Inventário de origem das imagens](https://github.com/HelioConde/portfolio2.0/blob/main/docs/PREVIAS_PROJETOS.md).

### Arquivo de projetos

Utilizar `<details>` nativo para organizar links em temas. O elemento funciona sem JS customizado e oferece navegação por teclado. Não usar carrossel interativo dentro do README.

## Diretrizes de web design e acessibilidade

- Sequência semântica dos títulos; um H1.
- Não depender apenas de emoji ou cor para transmitir significado.
- `alt` descritivo em screenshots; nos badges, o texto alternativo comunica a ação.
- Todos os links de projetos usam HTTPS.
- Não usar GIFs em loop, fundos cintilantes nem animações que ignorem `prefers-reduced-motion`.
- Evitar tabelas como grade visual de cards, por causa da rolagem horizontal no mobile.
- Preservar rótulos de estágios: estudo, protótipo, beta, publicado ou concluído.
- Evitar dados pessoais de trabalho, segredos, credenciais e identificadores privados.

## Qualidade e revisão (Playwright CLI)

1. Executar `npm run qa:readme`: estrutura, âncoras locais, links HTTPS, imagens com texto alternativo e limites de mídia.
2. Executar `npm run qa:visual` **com acesso à internet**: o Playwright captura a versão renderizada do README no GitHub nas larguras 390, 768 e 1440 px.
3. Revisar `artifacts/readme-qa/` (capturas e relatório JSON), especialmente quebras horizontais, imagens e erros de página.
4. Revisar manualmente links externos, descrições de produtos e maturidade das versões; testes automáticos não provam que uma funcionalidade está operacional.

A automação usa o README da **branch em revisão** em vez de assumir que a versão pública já foi alterada. A aparência final pode variar conforme as mudanças na própria interface do GitHub.

## Alterações futuras

Antes de inserir um novo projeto em destaque, pergunte: ele representa um resultado verificável? Uma demonstração ou repositório está acessível? O status está correto? Faz sentido exibi-lo antes dos demais? Preserve um conjunto curto de destaques; demais entradas pertencem ao arquivo recolhível.
