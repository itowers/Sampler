# Modelo de dados · versão 2

A versão 1 guardava cada coisa num array paralelo dentro do padrão (`n`, `lk`, `fx`, `mx`, `sc`, `mute`, `solo`), todos com 64 posições, e misturava o passo rico (`rat`, `mi`, `cd`, `tie`) com as travas de parâmetro. A versão 2 agrupa por **o que toca** e **quando toca**.

```
aparelho  = { latAdj, fade }                         IndexedDB 'aparelho'; fora do projeto e do backup
projeto S = { v:2, instr[16], patterns[16], cenas[], chain[], loops[4], perf{q,free}, bpm, swing, mix… }

quando toca
  cadeia  = [{ c: índice da cena, x: vezes }]
  cena    = { p: padrão, l: null | [4 booleanos] }   null = não mexe nos loops; senão, só esses tocam
  padrão  = { len, tr[16], fx }
  loop    = { len (compassos), tr[16], st, mute, fb, layers, … }

o que toca
  trilha  = { c, d, m, so, p:{ índice: passo } }     a trilha s toca o instrumento s
  passo   = { k:[teclas], l:{param: valor}, rat, mi, cd, tie }
            loop PERF: + g:[ganho por tecla], nw:[nota nova nesta volta]
  trilha FX (padrão.fx) = { m, p:{ índice: { fx, dj } } }
  instr   = { name, params, slices, lastKey, ins, marks }
```

## O que mudou na prática

- **Passo único:** apagar um passo (`delete trilha.p[i]`) leva junto nota, trava e passo rico. Não há mais dois arrays para manter sincronizados.
- **Trava limpa:** `l` só tem parâmetros de som. `trigger` recebe `{...params, ...l}` sem `rat`/`cd`/`mi`/`tie` misturados.
- **Esparso:** só os passos com conteúdo são guardados. Um padrão de demonstração vai de 16×64×2 posições para ~10 entradas.
- **Trilha FX:** efeitos e filtro DJ travado vivem no mesmo lugar, por passo.
- **Loop = padrão:** loops PERF usam as mesmas trilhas e os mesmos helpers (`addK`, `delK`, `stp`). `salvar` virou uma cópia passo a passo.
- **Cenas:** a cadeia aponta para cenas. `+cena` (modo Perf) guarda o padrão atual com os loops que estão tocando; ao entrar nela, só esses loops tocam. Repetições ficam em `x` (`1×3›2`), então o limite de 128 deixa de ser de toques.
- **Aparelho separado:** latência calibrada e fade ficam no aparelho e não vão no backup.

## Migração

`migrate()` converte cada parte que ainda estiver no formato antigo (padrões com `n`, cadeia de números, `perf.tracks`, `slots`, `latAdj`, `mix.fade`) e marca `v:2`. O teste 9.11 monta um projeto v1, migra, confere a estrutura e renderiza o padrão de referência: o áudio sai igual ao golden (0/1000 RMS). Backups v1 continuam abrindo.

## Helpers

`stp(p,s,i)` passo · `nk` teclas · `hasN` tem nota · `stpMk` cria · `addK`/`delK` põe/tira tecla · `delSt` apaga passo · `fxAt`/`djAt`/`fxSet` trilha FX · `chainOf([padrões])` monta cadeia · `cenaFor(p,l)` acha ou cria cena · `chainTxt` texto do visor.
