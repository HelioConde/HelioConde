# Design System — Perfil GitHub

> O README é Markdown renderizado pelo GitHub. Não há CSS customizado, comportamento JavaScript ou sistema de layout proprietário.

## Direção editorial

O perfil deve comunicar **o que Hélio construiu**, em vez de repetir uma biografia ou exibir métricas decorativas. Os projetos mais representativos aparecem primeiro; outros repositórios ficam em seções expansíveis.

1. **Hero curto:** nome, atuação, proposta de valor e três links úteis (portfólio, LinkedIn e GitHub).
2. **Vitrine única:** Ofertamática, Base Studio Pizzas e PlayWithEliteItem recebem **uma imagem** cada, imediatamente antes de sua descrição.
3. **Jogos em evolução:** Slimekeepers e Re:Dream aparecem com **uma imagem contextual própria**; os títulos dizem explicitamente “em desenvolvimento”.
4. **Arquivo compacto:** os demais projetos ficam organizados em `<details>` nativo.
5. **Stack de leitura rápida:** quatro linhas com categorias, sem blocos extensos de badges ou autoelogios.

## Padrões visuais (Taste / Awesome Design)

| Elemento | Padrão |
| --- | --- |
| Espaçamento | Linha em branco entre componentes; sem separadores a cada projeto |
| Tipografia | Único H1, seções H2, projetos H3 |
| CTAs | Um link primário destacado e um link de código por projeto |
| Imagens | `<img width="680">`, com `alt` claro, dentro de link HTTPS |
| Identidade | Tipografia e fundo nativos do GitHub; badges escuros apenas no hero |
| Status | Texto legível, não depende de cor ou emoji |
| Interação | `<details><summary>` para coleções secundárias |
| Movimento | Sem GIFs, animações ou carrosséis automáticos |

## Imagens: uma aparição por projeto

Todas são arquivos reais já existentes em `HelioConde/portfolio2.0/img/projects/`:
- `ofertamatica.jpg` — captura da aplicação pública.
- `base-studio-pizzas.jpg` — captura do site público.
- `playwitheliteitem.jpg` — página pública no Thunderstore; **não gameplay**.
- `slimekeepers-menu.png` — arte do menu principal; **não gameplay**.
- `redream.jpg` — captura da **pré-alfa pública**, sem prometer multiplayer de produção.

Origens documentadas em [PREVIAS_PROJETOS.md](https://github.com/HelioConde/portfolio2.0/blob/main/docs/PREVIAS_PROJETOS.md). Evite reutilizar a mesma imagem em uma galeria separada e depois na descrição.

## Regras de conteúdo

- Diferenciar projeto de portfólio concluído de produto comercial homologado.
- Distinguir mod público do código experimental.
- Informar status “em desenvolvimento” para Slimekeepers e Re:Dream, sendo este último **pré-alfa**.
- Não afirmar funcionalidades de backend persistente em projetos apenas com frontend estático no GitHub Pages.
- Atualizar stacks a partir dos READMEs dos repositórios, não de planos antigos.
- Não mostrar estatísticas de downloads sem data e fonte.
- Não divulgar dados privados, chaves, tokens ou trabalho interno.

## Qualidade

`npm run qa:readme` valida seções, âncoras, HTTPS, cinco imagens únicas, textos alternativos e links dos jogos.

`npm run qa:visual` captura o README real no GitHub em **390, 768 e 1440 px**, aguardando o carregamento das imagens. Registra largura de conteúdo, imagens quebradas, console e relatório JSON.

A verificação automática não substitui inspeção humana de espaçamento, comprimento da página, hierarquia e fidelidade das imagens. O README não precisa de GitHub Pages nem banco de dados.
