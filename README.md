# Sampler · Bolso-16

Sampler e sequenciador de bolso inspirado no Pocket Operator PO-33. É um único arquivo HTML, sem dependências nem build: abra `index.html` no navegador (funciona no celular).

## Recursos

- 16 sons: 1–8 de melodia, 9–16 de batida e amostras (16 fatias). A fábrica vem com 8 presets e 4 kits sintetizados ao vivo, que não ocupam a memória de amostras.
- **Biblioteca de sons** (Som › sons, ideias do [DuoSampler](https://github.com/itowers/DuoSampler)): 48 presets de melodia em 6 categorias (lead, baixo, pad, teclas, pluck, FX), com FM, sub, vibrato, wobble e envelope de tom; 12 kits de bateria sintetizados (808, 909, lo-fi, eletro, trap, house, techno, boom bap, dub, garage, minimal, industrial), com os pads na ordem do Kit 1 e o 808 no tom do padrão; as amostras da fábrica antiga e arquivo de áudio.
- Nos presets sintetizados a nota sustenta enquanto a tecla está apertada. Gravando ao vivo, o passo guarda quanto tempo você segurou; sem isso, a nota soa até a próxima nota do mesmo som (no máximo 1 compasso; tie estende).
- Reverb e eco por envio: cada som tem a página ESP (reverb · eco) e o modo FX tem a página ECO (realimentação · tempo de 1/16 a 1/4, no BPM).
- **Melodia no teclado, batida nos pads.** Os sons 1–8 tocam num teclado de 7 acordes no estilo do [DuoSynth](https://github.com/itowers/DuoSynth): os 7 graus do tom, joystick de 8 variações que trava (troca maior/menor, 7, maj7, 9, sus4, 6/sus2, dim, aug), estilos Acorde, Strum, Arp e Nota (no Nota o joystick muda oitava e semitom), tom e escala por padrão (8 escalas), inversão e oitava por som. REC ao vivo e Passos gravam o acorde inteiro no passo. Os sons 9–16 continuam nos 16 pads.
- Arp no tempo do BPM: 1/4 a 1/32 e tercina, ordem (manual, ↑, ↓, ↑↓, ↓↑, aleatória), 6 ritmos e alcance de 1 a 4 oitavas. Grava no padrão com REC.
- Progressão (ideia do OP-Z): um som marcado como PROG conduz a harmonia e os outros sons de melodia transpõem as notas pelo acorde que está tocando (ou ignoram).
- Componentes de passo melódicos (ideia do OP-Z): quebra de acorde, rampa de escala ↑/↓, glide, salto (volta ao passo 1 ou pula ao acaso) e tonal por passo.
- Sequenciador de 16 passos, 16 padrões, cadeia de cenas (padrão + loops, com repetição ×N), swing e TAP.
- Gravação por passos e ao vivo, com travas de parâmetro por passo. Quant (ao lado do swing): 1/16 cai no passo; livre guarda o desvio do toque como micro do passo, no padrão e no Perf. REC parado faz contagem de 1 compasso; cada volta soma notas (overdub) e dá para desfazer volta a volta. Repetição de nota (1/8, 1/16, 1/32) e borracha.
- Metrônomo (desligado, só gravando ou sempre), com volume e contagem no menu.
- Padrões de 8, 16, 32 ou 64 passos, com páginas e visão geral no visor. Esticar duplica; encurtar não apaga.
- Passos › todos: todos os sons do padrão sobrepostos numa grade, com mute e solo por som. Cada som pode ter comprimento (1–64) e divisão (1/32 a 2 compassos) próprios: polimetria sem sair de fase.
- Passos › passo: ratchet (2–4×), micro timing (±meio passo), condições (1:2, 2:2, 1:4, 50%, FILL, !FILL) e tie por passo. Botão FILL na linha de play.
- REC ao vivo com compensação de latência; no menu dá para calibrar com 8 toques junto com o clique.
- Perf: looper de 4 faixas de notas com ações quantizadas no compasso, overdub com feedback, desfazer/refazer, ×2, ½, salvar como padrão e reamostrar para áudio.
- **Faixa = som** (modelo de grupos do K.O. II): cada faixa do Perf toca um som; escolher a faixa troca os pads ou o teclado, e só ela grava esse som. O som da faixa aparece no cartão (toque de novo para trocar). Mix por faixa nos sliders do Perf: NÍV (volume · pan), COR (filtro DJ · drive), ESP (reverb · eco). Sons de melodia mostram o joystick ao lado das teclas.
- **Perf › passos**: os Passos editam a faixa (as mesmas notas que o REC gravou), com ratchet, micro, condição, tie, trava e quebra/rampa.
- **+cena** guarda uma cópia das 4 faixas (notas, som e mix) com o padrão no fim da cadeia; na virada da cena, a cadeia troca as faixas e guarda o que mudou na cena que sai.
- 15 efeitos (loops, uníssono, oitavas, stutter, scratch, 6/8, retrigger, reverso), ao vivo ou gravados no padrão, com fade ajustável para não estalar.
- Mix no modo FX: DUCK (bombeamento pelo bumbo), filtro DJ (com trava por passo), DUST (lo-fi e vinil). Limitador sempre ligado no master. INSERT por som (drive, crush ou filtro) em Som › INS.
- Gravação de amostras pelo microfone (Som › mic: segure um pad) ou carregando arquivo de áudio. Memória de 40 s, só para amostras. Em Som › sons: cortar de verdade (libera a memória do resto), reverso e one-shot / segura (a amostra para ao soltar).
- Som › chop: fatia a amostra por tap, por ataques detectados ou em grade, edita as marcas no visor e distribui as fatias nos pads de um som de bateria.
- Som › textura: um som em loop, fora da grade, com filtro e freeze.
- Perf › bpm loop: o primeiro loop gravado define o BPM.
- Visual de ferrofluido em WebGL, que reage a pads, BPM, volume, afinação, filtro e efeitos.
- Interface clara com teclas em relevo e 6 modos (Tocar, Passos, Som, Padrão, FX, Perf), sem funções escondidas; volume, visual e ajuda ficam no menu ⋯.
- Tela em duas metades iguais com 12 px vazios no meio, para a dobra do aparelho: em cima visor e controles, embaixo transporte e pads (aberto na horizontal: esquerda e direita). Conferido em 375×667, 390×844, 538×765, 768×1024 e 1000×760.
- No iPhone, o app pede a sessão de áudio de reprodução (toca com o silencioso ligado, onde o Safari permite) e só usa a de gravação com o microfone aberto.

## Modelo de dados (versão 3)

```
aparelho  = { latência calibrada, fade }            fica no aparelho, fora do projeto e do backup
projeto   = { v:3, instr[16], patterns[16], cenas[], chain[], loops[4], prog, arp, bpm, swing, mix… }
padrão    = { len, key, sc, tr[16], fx }             tom e escala do teclado · a trilha s toca o instrumento s
trilha    = { c, d, m, so, p:{ índice: passo } }     comp, divisão, mute, solo; só passos com conteúdo
passo     = { k:[teclas], l:{trava}, rat, mi, cd, tie, cm, du }   sons 1–8: tecla = semitom (0 = C3); cm = componente melódico; du = duração gravada (passos)
passo FX  = { fx, dj }                               efeito e filtro DJ travado no passo
som       = { name, params{p,v,f,r,st,ln,rv,ec,a,rl}, slices, syn, kp, gate, … }   syn = {t:'m'|'k', id} preset ou kit sintetizado (null = amostra)
loop PERF = { len, tr[16], st, mute, fb, inst, fx{v,p,f,d,r,e}, … }   mesmas trilhas do padrão (+ ganho por nota); inst = som da faixa
cena      = { p, l, lp }                             padrão + quais loops tocam; lp = cópia das 4 faixas (+cena)
mix       = { dp, ds, dk, dj, du, dn, ef, et }       … ef/et = realimentação e tempo do eco · projeto.rq = 'grade' | 'livre'
cadeia    = [{ c: cena, x: vezes }]
```

Projetos salvos nos formatos antigos (versões 1 e 2) são convertidos ao abrir e tocam igual. Os campos das melhorias do DuoSampler (syn, du, rv/ec, inst/fx das faixas, lp das cenas, rq) são aditivos: projetos e backups da versão 3 abrem com os sons de amostra de antes, e "Restaurar fábrica" traz os sons sintetizados. Na versão 3, as notas dos sons 1–8 passam de índice da escala maior a semitom, para guardar acordes com notas fora da escala. `docs/modelo-dados.md` explica a mudança.

Padrões e sons ficam salvos no navegador (IndexedDB). No menu (⋯), **Exportar backup** gera um arquivo `.json` com todos os sons e padrões (no iPhone abre a folha de compartilhar, para salvar em Arquivos), e **Importar backup** restaura esse arquivo, substituindo tudo.

## Instalar como PWA

Abra o endereço do GitHub Pages no Safari (iPhone) ou no Chrome (Android) e use "Adicionar à Tela de Início". O app abre em tela cheia e funciona offline depois da primeira abertura. Para atualizar, abra o app online e feche e abra de novo (ou aumente `VERSION` em `sw.js`).

No iPhone, sons e padrões do app instalado ficam separados dos que você salvou no Safari.

## Estrutura

- `index.html`: o app inteiro (áudio, sequenciador, visual, interface).
- `manifest.webmanifest`, `sw.js`, `icons/`: instalação como PWA e uso offline.
- `docs/prompt-sequenciador.md`: prompt para levar o modelo de gravar, tocar e sequenciar a outro synth.
- `docs/modelo-dados.md`: o modelo de dados da versão 2 e a migração a partir da versão 1.
- `teste.html`: testes automáticos (timing, polimetria, passo rico, latência, mix, CHOP, migração v1/v2 → v3, acordes, progressão, componentes melódicos, arp, persistência, CPU; e 12–16: synth, reverb/eco, biblioteca, faixa = som, mix por faixa, passos na faixa, cenas com cópia, quant livre, cortar/reverso/gate). Os testes de áudio usam a fábrica antiga de amostras, para a referência não mudar. Abra no navegador e toque em "Rodar testes"; usa um banco de dados separado e não mexe nos seus sons. `testes/golden.json` guarda a referência de áudio por navegador (gere com `teste.html?atualizar=1`).

## Limitações

- Não replica o que depende do hardware do PO-33: relógio, alarme, bateria, sincronização por cabo e backup por áudio.
- O microfone exige HTTPS (ou `localhost`) e a permissão do navegador. Dentro do claude.ai ele é bloqueado, e o app cai para o seletor de arquivo.
- Os sons sintetizados pesam mais que as amostras: num padrão típico (bateria, baixo, acordes e lead) o render custa cerca de 2,3 vezes o das amostras. A melodia continua mono por som, como antes (a nota nova corta a anterior; as notas do mesmo acorde ficam).
- A referência de áudio (`testes/golden.json`) só existe para o Chrome; no iPhone, gere com `teste.html?atualizar=1`.
