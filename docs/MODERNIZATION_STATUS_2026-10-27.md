# Plano contínuo de modernização GitHub — 27/10/2026

> **Estado verificável**, não uma declaração de conclusão dos 77 repositórios. Esta página reúne trabalhos já feitos, validações do GitHub Actions e próximas etapas. Para gerenciar o roteiro central, veja [issue #3](https://github.com/HelioConde/HelioConde/issues/3).

## Entregas desta rodada

| Projeto | Mudança | Comprovação | Estado |
| --- | --- | --- | --- |
| [Game Clicker](https://github.com/HelioConde/Game-clicker-in-Jquery) | Menu de backup JSON, importação com confirmação, acessibilidade, `docs/DESIGN_SYSTEM.md` e novos Playwright | [PR #9 integrado](https://github.com/HelioConde/Game-clicker-in-Jquery/pull/9), [62 testes de navegador aprovados](https://github.com/HelioConde/Game-clicker-in-Jquery/actions/runs/40482073134), [deploy corrigido e aprovado](https://github.com/HelioConde/Game-clicker-in-Jquery/actions/runs/40482406754) | Código e workflow concluídos |
| [checkLoss](https://github.com/HelioConde/checkLoss) | Painel estático com JSON fictício, importação/CSV e Playwright | [Implementação integrada](https://github.com/HelioConde/checkLoss/pull/1), [publicação branch Pages](https://github.com/HelioConde/checkLoss/actions/runs/40481493661) | App estático publicado por branch |
| [checkLoss — segurança CSV](https://github.com/HelioConde/checkLoss/pull/4) | Proteção de fórmulas nos rótulos CSV e teste de regressão | [PR #4 integrado](https://github.com/HelioConde/checkLoss/pull/4), [12 testes aprovados](https://github.com/HelioConde/checkLoss/actions/runs/40482713016), publicação atualizada na branch `gh-pages` | Integrado, 12 testes aprovados e [deploy do Pages concluído](https://github.com/HelioConde/checkLoss/actions/runs/40483014227) |

## Repositórios com pipelines recentes aprovados

| Projeto | Evidência | Limite |
| --- | --- | --- |
| [DJ Sona](https://github.com/HelioConde/dj-sona) | [Build e Pages](https://github.com/HelioConde/dj-sona/actions/runs/40480509332) | Confirmar sempre rotas e vídeo no navegador real |
| [Rede Jovem](https://github.com/HelioConde/rede_social) | [QA e Pages](https://github.com/HelioConde/rede_social/actions/runs/40480001766) | GitHub Pages é a demonstração; chat e autenticação real exigem backend |
| [Office Ordem](https://github.com/HelioConde/Office-Ordem) | [QA e Pages estático](https://github.com/HelioConde/Office-Ordem/actions/runs/40478478157) | Bundle legado não equivale a código-fonte editável |
| [Rebbity](https://github.com/HelioConde/Rebbity) | [Deploy da demonstração](https://github.com/HelioConde/Rebbity/actions/runs/40474663300) | PHP histórico separado do front-end Pages |
| [Grand Chase HUD](https://github.com/HelioConde/Grand-Chase-Hud) | [Deploy](https://github.com/HelioConde/Grand-Chase-Hud/actions/runs/40474935778) | Jogabilidade e qualidade dos modelos ainda dependem de QA evolutivo |
| [Chat Arena](https://github.com/HelioConde/Game_Linked_to_Twitch-Chat) | [Publicação da demo](https://github.com/HelioConde/Game_Linked_to_Twitch-Chat/actions/runs/40473273151) | A Twitch real exige autorização OAuth, não é um chat público simulado |
| [Image Gallery](https://github.com/HelioConde/Image_Gallery) | [Publicação](https://github.com/HelioConde/Image_Gallery/actions/runs/40464095270) | Upload remoto requer serviço, não prometer em Pages puro |

**Aviso:** workflow verde comprova etapas automatizadas, não teste presencial em cada navegador ou dispositivo. A disponibilidade HTTP externa deve ser verificada separadamente, quando a ferramenta permitir.

## Plano em sequência (uma aprovação por lote, não por arquivo)

### Fase 1 — Baseline e segurança
- [ ] Agrupar os 77 repositórios por natureza: site estático, API/servidor, aplicativo local/desktop, jogo multiplayer, acervo histórico.
- [ ] Verificar credenciais públicas, dados internos, endpoints PHP, dependências antigas e compilados sem fonte.
- [ ] Preservar builds originais e abrir branch/PR por repositório para mudanças substanciais.

### Fase 2 — Taste Skill e Awesome Design
- [ ] Consolidar tokens sem duplicá-los ao fim do CSS; padronizar espaçamento, foco, superfícies, responsividade e tipografia.
- [ ] Documentar componentes e estados em `docs/DESIGN_SYSTEM.md` onde ainda não houver.
- [ ] Refatorar componentes sem modificar a identidade do produto ou quebrar gameplay.

### Fase 3 — Web Design Guidelines e Image to Code
- [ ] Revisar teclado, foco, alvos de toque, rótulos, estado de erro, contraste e `prefers-reduced-motion`.
- [ ] Comparar screenshots de antes/depois e modernizar componentes com referências existentes.
- [ ] Preservar sprites, ícones originais, proporções e conteúdo sem inventar assets.

### Fase 4 — GitHub Pages sem banco de dados
- [ ] Usar JSON estático, `localStorage` e/ou IndexedDB somente para dados de demonstração e preferências locais.
- [ ] Incluir exportação/importação local quando houver progresso ou dados importantes.
- [ ] Em Vite, configurar `base` do repositório; em sites HTML, preferir caminhos relativos.
- [ ] Publicar build correto via Actions ou branch `gh-pages`; conferir todos os scripts e assets no artefato final.
- [ ] **Não** fingir login, multiplayer, mensagem em tempo real ou sincronização compartilhada sem backend real.

### Fase 5 — Playwright e critérios de pronto
- [ ] Capturar páginas inteiras em 320×568, 390×844, 768×1024, 1366×768, 1600×900.
- [ ] Inspecionar exceções JS, respostas 404, links, imagens e overflow.
- [ ] Testar os fluxos principais e restauração de dados locais, inclusive após recarregar.
- [ ] Revisar capturas, corrigir regressões, repetir QA e integrar PRs verdes.
- [ ] Confirmar o workflow de deploy, a origem Pages configurada e a disponibilidade do site público.

## Fronteiras técnicas
- `Re-Dream` multiplayer com WebSockets depende de servidor externo; o front-end pode ficar no Pages, o servidor não.
- `I.A` roda localmente e não se converte em serviço cloud gratuito só por hospedar UI estática.
- `Slime-Harvest` exige exportação HTML5 apropriada e teste de compatibilidade da versão Godot antes de publicá-lo.
- `Rebbity` e outras bases PHP devem preservar o legado como código, mas a demo do Pages não deve expor credenciais ou APIs sensíveis.
- Ferramentas internas de varejo devem usar dados fictícios nos exemplos públicos.

## Regra de encerramento
Marcar **concluído** apenas após implementar, testar e verificar a forma de publicação correspondente. Falhas ou restrições de permissão do Pages devem ser registradas como pendências, não mascaradas por sucesso de QA.
