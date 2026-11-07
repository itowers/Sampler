Quero adicionar a este synth o mesmo modelo de **gravar, dar play e sequenciar** que usei em outro app meu (um sampler estilo PO-33). Adapte ao motor de som que já existe aqui. Onde eu falo "som" e "tecla", entenda o que este synth toca quando uma tecla ou pad é pressionado: nota, acorde, fatia de bateria etc. Não mude o som nem o visual atual além do necessário. Antes de codar, me diga em 5 linhas como vai mapear o modelo para este synth e o que fica diferente.

## 1. Relógio (precisão de tempo)
- Use Web Audio com **agendamento antecipado**: um `setTimeout` a cada ~20 ms agenda tudo que cai nos próximos ~120 ms com `start(time)` no `AudioContext.currentTime`. Nunca dispare som direto do timer.
- A resolução é de **16 passos por padrão** (semicolcheias). Duração do passo = `60 / BPM / 4`.
- **Swing** (0–100%): atrasa os passos ímpares em `swing/100 × passo × 0,5`.
- Guarde uma fila `{tempo, passo, padrão}` de cada passo agendado. A interface usa essa fila em `requestAnimationFrame` para saber o passo que está **soando agora** (playhead) e não o que acabou de ser agendado.

## 2. Dados
```
padrão = {
  notas[som][passo] = [teclas...]          // várias notas por passo = acorde/camadas
  travas[som][passo] = {param: valor} | null // parameter lock
  fx[passo] = índice do efeito | -1
}
16 padrões · cadeia = [índices de padrão] (até 128, pode repetir)
```
- Cada som guarda a **última tecla tocada** (`lastKey`), que é a nota usada ao escrever passos.
- Salve tudo em IndexedDB com try/catch e debounce de ~700 ms. Se falhar, o app continua funcionando.

## 3. Formas de gravar
1. **Passos (escrita):** um modo em que as teclas viram os 16 passos. Tocar num passo vazio põe a `lastKey` do som atual. Tocar num passo cheio o apaga, junto com a trava dele. Mostre "− nota +" para escolher a nota sem sair do modo. Se estiver parado, toque a nota como prévia.
2. **Ao vivo:** botão REC (vermelho) liga ou desliga. Com REC ligado e tocando, cada tecla toca na hora e é gravada no **passo mais próximo** do instante do toque, procurado na fila de passos agendados. A gravação é quantizada e respeita o swing.
3. **Faixa de passos no visor:** 16 quadradinhos clicáveis que fazem o mesmo que o modo Passos para o som atual. Quadrado preenchido = tem nota, sublinhado vermelho = playhead, marca pequena = tem trava.

## 4. Play e padrões
- PLAY/STOP é um botão só. Ao parar, mantenha no padrão onde estava.
- **Padrão:** tocar 1–16 escolhe o padrão. Se estiver tocando, a troca entra no **fim do ciclo atual**, nunca no meio.
- **Cadeia:** um modo onde tocar padrões em ordem monta a cadeia, com botões "desfazer" e "nova". O padrão final volta ao primeiro. O visor mostra `CADEIA 1›2›1`.
- **Copiar para…** (padrão e som): armar, tocar o destino e pronto. **Limpar padrão** e **limpar som do padrão** pedem um segundo toque para confirmar ("confirmar?" por 2,5 s).

## 5. Travas de parâmetro
- Cadeado na linha de parâmetros. Com ele ligado e tocando, mexer num slider grava o valor **só no passo que está soando**, em vez de mudar o valor base. Arrastando, grava em cada passo que passar.
- Na reprodução, a nota usa `{...parâmetrosBase, ...trava}`.

## 6. Efeitos por passo (performance)
- Modo FX: 16 teclas = 15 efeitos + "sem efeito". Opção **segurar** (vale enquanto a tecla está pressionada) ou **travar** (liga/desliga).
- Opção **gravar no padrão**: enquanto o efeito estiver ativo, ele é escrito em `fx[passo]` de cada passo que tocar. Botão "apagar FX".
- O efeito ativo é `efeitoSegurado ?? padrão.fx[passo]`. Ele é aplicado no agendamento: loops repetem trechos de 4/3/2/1 passos ancorados no tempo, stutter redispara 3–4× dentro do passo, retrigger reinicia do passo 1, 6/8 reposiciona os passos em tercinas. No disparo da voz entram oitava ↑/↓, uníssono, reverso e scratch.
- Se este synth já tiver efeitos próprios, use os dele nesse esquema.

## 7. Tempo
- BPM 60–240 com − e +, e **TAP**: média dos intervalos dos toques nos últimos 2,5 s.
- Swing com − e +, em passos de 5%.

## 8. Interface (regras)
- **Nada escondido:** nenhuma função depende de segurar dois botões. Cada coisa tem botão visível ou vive num modo com a sua linha de ações logo abaixo das abas.
- Rótulos sempre em **uma linha**. Abrevie em vez de quebrar, e use reticências como último recurso.
- Layout com altura da tela (`100dvh`), sem rolagem. Os pads ocupam o espaço que sobra. Se a tela for larga (≥760 px e mais larga que alta), use duas colunas: controles à esquerda e pads à direita. Precisa funcionar em celular comum e na tela interna de dobrável (~538×765).
- Visor sempre mostra: padrão, passo atual/16, tocando ou parado, REC, trava e efeito ativo.

## 9. Teste antes de entregar
Grave um padrão por passos, outro ao vivo com swing em 30%, encadeie 1›2›1, grave uma trava e um efeito no padrão, pare e dê play de novo. Confira que tudo toca no tempo, que a troca de padrão espera o fim do ciclo e que nada se perde ao recarregar a página.
