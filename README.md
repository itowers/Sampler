# Sampler · Bolso-16

Sampler e sequenciador de bolso inspirado no Pocket Operator PO-33. É um único arquivo HTML, sem dependências nem build: abra `index.html` no navegador (funciona no celular).

## Recursos

- 16 sons: 1–8 melódicos (escala), 9–16 bateria (16 fatias). Vem com sons e kits sintetizados pelo próprio app.
- Sequenciador de 16 passos, 16 padrões, cadeia de até 128 padrões, swing e TAP.
- Gravação por passos e ao vivo (quantizada), com travas de parâmetro por passo.
- 15 efeitos (loops, uníssono, oitavas, stutter, scratch, 6/8, retrigger, reverso), ao vivo ou gravados no padrão.
- Gravação de amostras por microfone ou carregando arquivo de áudio. Memória de 40 s.
- Visual de ferrofluido em WebGL, que reage a pads, BPM, volume, afinação, filtro e efeitos.
- Interface sem funções escondidas, que se ajusta à altura da tela (celular, dobrável, tablet).

Padrões e sons ficam salvos no navegador (IndexedDB).

## Estrutura

- `index.html`: o app inteiro (áudio, sequenciador, visual, interface).
- `docs/prompt-sequenciador.md`: prompt para levar o modelo de gravar, tocar e sequenciar a outro synth.

## Limitações

- Não replica o que depende do hardware do PO-33: relógio, alarme, bateria, sincronização por cabo e backup por áudio.
- Dentro do claude.ai o microfone é bloqueado; fora dele a gravação por microfone funciona.
