# Correções de acessibilidade e solicitações da banca

Registro técnico para apoiar o relatório do grupo 10 sobre o UAU. Revisão realizada em 17 de novembro de 2026. Equipe: Gabriel Becca dos Santos, Matheus de Souza Andreato e Kevyn Fernandes Freitas.

Foram examinadas as 23 imagens dos dois arquivos ZIP enviados pelo grupo e a seção **Trabalho prático (sistema)** das considerações da banca. Os materiais enviados são evidências e requisitos de referência. As observações sobre apresentação e trabalho escrito não foram alteradas nesta implementação.

## Evidências iniciais do WAVE

O WAVE separa “Errors”, “Contrast Errors” e “Alerts”. Não se deve registrar zero problemas apenas porque a primeira categoria está zerada.

| Página | Errors | Contrast Errors | Alerts | Captura original das 17.05.56 |
| --- | ---: | ---: | ---: | --- |
| Home | 0 | 3 | 1 | Arquivo sem sufixo; a captura (3) mostra a interface |
| Detalhes de unidade | 0 | 4 | 1 | (4), complementada pela interface em (5) |
| Meu perfil | 0 | 2 | 1 | (6) |
| Avaliar unidade | 0 | 2 | 1 | (7) |
| Conversas com o suporte | 0 | 1 | 1 | (8) |
| Chat de suporte | 0 | 2 | 1 | (9) |
| Entrar no UAU | 0 | 1 | 1 | (10) |

São **15 ocorrências de contraste nas sete páginas**, não 15 causas distintas. O alerta `noscript` se repete nas páginas. As imagens (1) e (2) explicam as categorias de contraste e `noscript`; não são novas avaliações a somar.

As capturas de axe DevTools, das 17.15.59, mostram problemas de contraste e `Elements must only use permitted ARIA attributes`. Há várias capturas do mesmo resultado com elementos diferentes destacados; elas não foram somadas como novos erros. O relatório original em JSON/HTML do axe DevTools não foi fornecido, por isso não foi inventado um total de elementos únicos.

## Registro das correções

| Problema e situação anterior | Página e elemento | Identificação | O que foi alterado e situação depois |
| --- | --- | --- | --- |
| Texto branco de botões com pouco contraste sobre o verde | Acesso, login, perfil, avaliação e suporte | WAVE e axe DevTools | Verde principal passou de `#438F0B` para `#347008`. Mantido texto branco, com contraste superior a 4,5:1. |
| Textos secundários discretos demais | Unidade, suporte, perfil e lista de unidades | WAVE e axe DevTools | Cinza `#727272` substituído por `#596353` no tema claro, incluindo os placeholders. Retirada a opacidade adicional da informação de atualização do cartão do mapa. |
| Rótulo ARIA aplicado a um contêiner genérico da marca | Home, logo | axe DevTools | Nome acessível colocado na imagem, com papel de imagem; removido do contêiner genérico. |
| Rótulos ARIA sem papel adequado | Home, mapa e marcador de localização | axe DevTools e revisão do código | Mapa identificado como região nomeada e localização como imagem nomeada. Marcadores de unidades continuam sendo botões com nome da unidade e estado. |
| Barra de ocupação era um `div` nomeado sem papel | Detalhes da unidade | axe DevTools | Papel `progressbar`, rótulo, intervalo e valor acessível quando há dados atuais. Sem dados atuais, o texto acessível informa a indisponibilidade. A barra visual é limitada a 100%, mas o texto pode representar superlotação. |
| Rótulo de botão da unidade não continha todo o texto visível | Home, cartões da lista | Nova avaliação axe-core | Nome acessível passa a derivar do conteúdo do cartão, evitando divergência entre texto visível e nome anunciado. |
| Ausência de região principal | Home e telas internas | Nova avaliação axe-core | Adicionado marco semântico `main` à tela ativa. |
| Estrelas não expunham `aria-checked` no HTML | Avaliar unidade | Nova avaliação axe-core | Na web, usados rádios HTML com grupo e nomes acessíveis, estado de seleção nativo, Tab, Espaço e setas. No aplicativo, mantidos controles nativos com estado de seleção. |
| Estrelas desmarcadas pouco distinguíveis e linha apertada | Avaliar unidade em tela pequena | Revisão visual e teste de teclado | Estrelas vazias/cheias distinguem estado além da cor, com cores legíveis, área de 44 × 56 e largura que cabe em 320 px. |
| Indicação de foco limitada ao mapa | Controles web | Revisão de teclado | Contornos de foco para botões, links, campos e estrelas, compatíveis com os temas claro e escuro. |
| Logo grande provocava quebra do cabeçalho no celular | Home em 320 px | Teste responsivo | Logo reduzida para 128 px em telas menores que 400 px; conta e suporte cabem na mesma linha em 320 px. |
| Espaço fixo excessivo antes da mensagem | Chat | Revisão visual das capturas | Área de mensagens com altura máxima, em vez de impor 360 px mesmo em conversa curta. A página continua rolável em telas pequenas. |
| Texto acidental `gitgit` na área de carregamento | Home | Revisão do código | Fragmento removido. |
| Documento web declarava idioma inglês | HTML da aplicação | Revisão do build | Configuração `pt-BR` no Expo e definição do idioma do documento durante a inicialização. |

O vermelho de mensagens de erro no tema claro também foi ajustado para `#B42335`. Testes de regressão conferem contraste de texto, botões e mensagens nos dois temas; isso não substitui uma avaliação da página renderizada.

## Solicitações práticas da banca

| Item | Implementação ou avaliação realizada | Limite que permanece |
| --- | --- | --- |
| Intervalo de atualização | Detalhes explicam consultas da tela a cada 15 s e medições periódicas da câmera. Mostram última atualização e o padrão do cliente: 5 amostras, pausa de 10 s após o ciclo, além do processamento e da rede. README e exemplo da câmera foram alinhados ao código atual. | O intervalo efetivo depende do hardware, rede e configuração de cada instalação. Não é transmissão contínua. |
| Precisão e atualidade | Preservados estados de câmera e dados desatualizados, indicação de ausência de dados atuais, mediana de amostras e descarte de imagens pendentes. A interface explica o alcance da contagem. | Acurácia física e adequação do intervalo precisam de ensaio no local; não foram medidas nesta tarefa. Os limiares existentes continuam: online até 6 min, atrasada até 15 min e offline após isso. |
| Quantidade efetiva e entradas/saídas | A contagem de cada amostra representa presença no enquadramento, substituindo o valor anterior; não soma a mesma pessoa a cada envio. PDF deixa explícito que amostras não são pessoas únicas. | Não foi implementado rastreamento de trajetórias ou contador de pessoas únicas que entraram/saíram. Pessoas ocultas ou fora do quadro podem não ser detectadas. |
| Duplicidades | Mantidos NMS dentro de cada imagem, mediana de 5 amostras e UUID para impedir duplicação do mesmo envio no histórico. | NMS não identifica pessoas entre câmeras; mediana não resolve oclusões sistemáticas. |
| Aumento de câmeras e redundância | Avaliada a restrição atual e mantida uma câmera ativa por unidade para não somar coberturas sobrepostas sem um método validado. Dispositivos reservas podem existir desativados. | Múltiplas câmeras simultâneas exigem delimitação de áreas, sincronização e validação de deduplicação. Não há reconhecimento de identidade entre câmeras. |
| Método alternativo de validação | Adicionada conferência manual na tela da unidade, apenas para ADMIN, usando o endpoint já existente. Registro recebe origem MANUAL no histórico e no PDF, com controle de valor vazio, fracionário, negativo ou acima da capacidade permitida pelo endpoint manual. | A comparação deve observar a mesma área e horários próximos. A próxima medição da câmera substitui a ocupação atual; o registro manual não altera a conexão da câmera. |
| Turnos e histórico | PDF identifica turno por registro, mudanças de período, resumo com data de início, quantidade de amostras, mínimo, máximo e média. Madrugada vinculada ao dia de início da noite. Horários configuráveis via ambiente. | São períodos de referência, não registro de passagem de plantão. Datas legadas não armazenam fuso. Mudar configuração reclassifica a próxima exportação. |
| Suporte 24 horas | Tela informa que solicitações podem ser registradas a qualquer horário enquanto o sistema estiver disponível. Mantido chat persistido e consulta de novas mensagens a cada 5 s. | Não existe garantia de atendimento humano 24 h. Isso depende de escala real de pessoas. |
| Disponibilidade | Conferidas persistência de mensagens, tratamento de falhas, novas tentativas de consulta e estados da câmera. Documentada a diferença entre registro disponível e atendimento humano. | Disponibilidade contínua depende de hospedagem, energia, rede, monitoramento, backups e equipe; não é garantida por uma alteração de interface. |
| Modo escuro | Recurso existente preservado e testado no perfil. Ajustes de contraste e foco respeitam o tema. | Não foi produzido novo APK nesta tarefa. |
| Responsividade e alinhamento | Cabeçalho compacto, botões limitados à largura disponível, estrelas e chat ajustados. Conferidas telas em 320 px e desktop. | Outros aparelhos, zoom e leitores de tela precisam de avaliação adicional. |

### Configuração dos turnos

```text
TURNO_MANHA=06:00
TURNO_TARDE=12:00
TURNO_NOITE=18:00
```

Os três inícios devem estar em ordem crescente. O backend recusa a configuração fora dessa ordem. Padrão de exemplo: 17/11 às 05:59 pertence à noite iniciada em 16/11; às 06:00 começa a manhã de 17/11. Esses horários precisam ser ajustados à realidade da unidade.

Nenhuma migration nova foi necessária para os turnos, pois a classificação é calculada a partir da data de cada registro. O limite de exportação continua sendo os 100 registros mais recentes; o resumo de turno cobre somente esse recorte, que pode conter turnos incompletos. As médias são por amostra, sem ponderação por tempo.

## Validação realizada

- Backend: `mvnw.cmd verify`, PostgreSQL 18 em banco local isolado `uau_test`. 45 testes encontrados: **44 passaram, 1 desativado**, sem falhas. O desativado consulta geocodificação externa e exige configuração específica.
- Frontend: `npm run typecheck` e `npm run build:web` concluídos. **8 testes passaram**, incluindo contraste dos temas claro e escuro, persistência de sessão e pesquisa de CEP.
- Câmera: **12 testes passaram**, incluindo supressão de caixas duplicadas, mediana contra valor discrepante, falha de captura sem envio de zero, autenticação e repetição idempotente de envio.
- Relatório: teste de 100 registros, percentual original preservado, virada de período, mudança da data de referência na madrugada e limites de turno. As três páginas do PDF de teste foram renderizadas e inspecionadas, sem cortes ou sobreposições.
- Navegador: login em conta fictícia, conferência manual inválida e válida, criação e persistência de conversa, seleção de estrelas com seta para direita e troca de tema.
- Responsividade: Home, detalhes, avaliação e chat em **320 px**, sem transbordamento horizontal do documento. Na avaliação, as cinco estrelas permaneceram na mesma linha.

### Nova avaliação com axe-core

Executada no navegador, com **axe-core 4.14.1**, em build local e banco de demonstração sem dados reais. O avaliador foi inserido apenas no servidor temporário de QA; não foi incorporado ao aplicativo nem ao build de distribuição.

Foram registrados **13 estados de página/tema/resolução, todos sem violações automáticas detectadas**, incluindo Home, acesso, login, unidade, avaliação, perfil claro/escuro, lista de suporte e conversa. O resumo por página está em [resultados-axe-core.json](evidencias/resultados-axe-core.json). A versão 4.14.1 é diferente do axe-core 4.13.0 mostrado nas capturas do axe DevTools original. Também há diferenças de dados, resolução, sessão e estado de interface. Portanto, as quantidades não são uma comparação controlada entre a mesma extensão antes e depois.

`violations: 0` significa ausência de violações automáticas detectadas naquele estado. Os itens `incomplete` continuam exigindo inspeção humana e estão listados no resumo; não foram contabilizados como problemas resolvidos. Não se trata de uma certificação de acessibilidade.

## Comparação para a atividade

1. **Problemas comuns às duas ferramentas:** contraste baixo em botões e textos secundários, visível nas capturas fornecidas.
2. **Somente WAVE nas capturas:** alerta de elemento `noscript`. É um aviso para verificar a alternativa sem JavaScript; não equivale a erro de contraste. O aplicativo depende de JavaScript e a mensagem de fallback gerada pelo Expo foi preservada.
3. **Somente axe DevTools nas capturas:** rótulos ARIA em elementos sem papel compatível. A nova avaliação também encontrou divergência de nomes acessíveis, falta de marco principal e ausência de estado nas estrelas; esses últimos achados não devem ser atribuídos retroativamente às capturas originais.
4. **Por que os resultados diferem:** ferramentas agrupam e classificam achados de maneiras diferentes e podem usar regras e versões diferentes. Conteúdo carregado, estado da conta, tema e resolução também mudam os elementos avaliados.
5. **Prioridade:** contraste afeta a leitura de diversas telas; semântica e estado de controles afetam o entendimento por tecnologias assistivas. Ambos foram tratados.

## Evidências depois das correções

As capturas abaixo foram feitas com dados fictícios em ambiente isolado:

- [Home no desktop](../design/screenshots/home-desktop.jpg).
- [Detalhes de unidade](../design/screenshots/unidade-desktop.jpg).
- [Conferência manual e foco do teclado](../design/screenshots/unidade-monitoramento.jpg).
- [Avaliação em 320 px](../design/screenshots/avaliacao-mobile.jpg).
- [Perfil em modo escuro](../design/screenshots/perfil-escuro.jpg).
- [Primeira página do PDF com turnos](evidencias/relatorio-turnos.png), com dados sintéticos do teste automatizado.

Para as evidências anteriores, utilize as imagens originais dos ZIPs enviados pelo grupo. Elas não foram publicadas no repositório, pois mostram dados e contexto do ambiente original.

## O que falta para entregar a atividade acadêmica

1. Executar novamente as extensões **WAVE e axe DevTools** na versão atualizada e capturar os resultados de cada página. A execução feita aqui foi do motor axe-core; não foi uma nova execução das duas extensões.
2. Usar o mesmo conjunto de páginas, estado de conta, tema e resolução para comparar antes e depois. Separar “Errors”, “Contrast Errors”, “Alerts”, violações e itens que exigem revisão.
3. Revisar os `incomplete`, o alerta `noscript`, o uso com teclado, zoom e leitor de tela. Não declarar zero barreiras a partir de testes automáticos.
4. Montar o DOCX pedido na atividade com identificação do grupo, páginas avaliadas, resultados, tabela, imagens antes/depois e reflexão do grupo. Este registro fornece o histórico técnico das correções, sem inventar resultados das extensões ou experiências pessoais dos integrantes.
5. Confirmar funções individuais e título oficial do TCC para concluir a personalização bibliográfica do README. Os nomes fornecidos já foram incluídos.

### Pontos para a reflexão do grupo

O principal ganho foi tornar textos legíveis e controles compreensíveis por mais formas de interação. Os testes manuais de teclado revelaram a necessidade de verificar o estado selecionado das estrelas; um elemento apenas parecer clicável não garante que tecnologias assistivas entendam sua função. Ainda são necessários ensaios com pessoas, leitores de tela, zoom e contagem física no ambiente real. As respostas sobre o aprendizado e a experiência do grupo devem ser redigidas pelos próprios integrantes.
