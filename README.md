# Sampler · Bolso-16

Sampler e sequenciador de bolso inspirado no Pocket Operator PO-33. É um único arquivo HTML, sem dependências nem build: abra `index.html` no navegador (funciona no celular).

## Recursos

- 16 sons: 1–8 melódicos (escala), 9–16 bateria (16 fatias). Vem com sons e kits sintetizados pelo próprio app.
- Sequenciador de 16 passos, 16 padrões, cadeia de cenas (padrão + loops, com repetição ×N), swing e TAP.
- Gravação por passos e ao vivo (quantizada), com travas de parâmetro por passo. REC parado faz contagem de 1 compasso; cada volta soma notas (overdub) e dá para desfazer volta a volta. Repetição de nota (1/8, 1/16, 1/32) e borracha.
- Metrônomo (desligado, só gravando ou sempre), com volume e contagem no menu.
- Padrões de 8, 16, 32 ou 64 passos, com páginas e visão geral no visor. Esticar duplica; encurtar não apaga.
- Passos › todos: todos os sons do padrão sobrepostos numa grade, com mute e solo por som. Cada som pode ter comprimento (1–64) e divisão (1/32 a 2 compassos) próprios: polimetria sem sair de fase.
- Passos › passo: ratchet (2–4×), micro timing (±meio passo), condições (1:2, 2:2, 1:4, 50%, FILL, !FILL) e tie por passo. Botão FILL na linha de play.
- REC ao vivo com compensação de latência; no menu dá para calibrar com 8 toques junto com o clique.
- Perf: looper de 4 faixas de notas com ações quantizadas no compasso, overdub com feedback, desfazer/refazer, ×2, ½, salvar como padrão, +cena (padrão com os loops que estão tocando entra na cadeia) e reamostrar para áudio.
- 15 efeitos (loops, uníssono, oitavas, stutter, scratch, 6/8, retrigger, reverso), ao vivo ou gravados no padrão, com fade ajustável para não estalar.
- Mix no modo FX: DUCK (bombeamento pelo bumbo), filtro DJ (com trava por passo), DUST (lo-fi e vinil). Limitador sempre ligado no master. INSERT por som (drive, crush ou filtro) em Som › INS.
- Gravação de amostras pelo microfone (Som › mic: segure um pad) ou carregando arquivo de áudio. Memória de 40 s.
- Som › chop: fatia a amostra por tap, por ataques detectados ou em grade, edita as marcas no visor e distribui as fatias nos pads de um som de bateria.
- Som › textura: um som em loop, fora da grade, com filtro e freeze.
- Perf › bpm loop: o primeiro loop gravado define o BPM.
- Visual de ferrofluido em WebGL, que reage a pads, BPM, volume, afinação, filtro e efeitos.
- Interface clara com teclas em relevo e 6 modos (Tocar, Passos, Som, Padrão, FX, Perf), sem funções escondidas; volume, visual e ajuda ficam no menu ⋯, que se ajusta à altura da tela (celular, dobrável, tablet).

## Modelo de dados (versão 2)

```
aparelho  = { latência calibrada, fade }            fica no aparelho, fora do projeto e do backup
projeto   = { v:2, instr[16], patterns[16], cenas[], chain[], loops[4], bpm, swing, mix… }
padrão    = { len, tr[16], fx }                      a trilha s toca o instrumento s
trilha    = { c, d, m, so, p:{ índice: passo } }     comp, divisão, mute, solo; só passos com conteúdo
passo     = { k:[teclas], l:{trava}, rat, mi, cd, tie }
passo FX  = { fx, dj }                               efeito e filtro DJ travado no passo
loop PERF = { len, tr[16], st, mute, fb, … }         mesmas trilhas do padrão (+ ganho por nota)
cena      = { p, l }                                 padrão + quais loops tocam (null = não mexe)
cadeia    = [{ c: cena, x: vezes }]
```

Projetos salvos no formato antigo (versão 1) são convertidos ao abrir e tocam igual. `docs/modelo-dados.md` explica a mudança.

Padrões e sons ficam salvos no navegador (IndexedDB). No menu (⋯), **Exportar backup** gera um arquivo `.json` com todos os sons e padrões (no iPhone abre a folha de compartilhar, para salvar em Arquivos), e **Importar backup** restaura esse arquivo, substituindo tudo.

## Instalar como PWA

Abra o endereço do GitHub Pages no Safari (iPhone) ou no Chrome (Android) e use "Adicionar à Tela de Início". O app abre em tela cheia e funciona offline depois da primeira abertura. Para atualizar, abra o app online e feche e abra de novo (ou aumente `VERSION` em `sw.js`).

No iPhone, sons e padrões do app instalado ficam separados dos que você salvou no Safari.

## Estrutura

- `index.html`: o app inteiro (áudio, sequenciador, visual, interface).
- `manifest.webmanifest`, `sw.js`, `icons/`: instalação como PWA e uso offline.
- `docs/prompt-sequenciador.md`: prompt para levar o modelo de gravar, tocar e sequenciar a outro synth.
- `docs/modelo-dados.md`: o modelo de dados da versão 2 e a migração a partir da versão 1.
- `teste.html`: testes automáticos (timing, polimetria, passo rico, latência, mix, CHOP, migração v1 → v2, persistência, CPU). Abra no navegador e toque em "Rodar testes"; usa um banco de dados separado e não mexe nos seus sons. `testes/golden.json` guarda a referência de áudio por navegador (gere com `teste.html?atualizar=1`).

## Limitações

- Não replica o que depende do hardware do PO-33: relógio, alarme, bateria, sincronização por cabo e backup por áudio.
- O microfone exige HTTPS (ou `localhost`) e a permissão do navegador. Dentro do claude.ai ele é bloqueado, e o app cai para o seletor de arquivo.
