"""Gera pages/calendario-365.js a partir da planilha do calendário editorial.

Uso: python3 tools/importar_calendario.py [conteudo/365_Clicks_Calendario_Editorial_365_Dias.xlsx]
Requer: pip install openpyxl
"""
import json
import sys

import openpyxl

ORIGEM = sys.argv[1] if len(sys.argv) > 1 else "conteudo/365_Clicks_Calendario_Editorial_365_Dias.xlsx"
DESTINO = "pages/calendario-365.js"

wb = openpyxl.load_workbook(ORIGEM, data_only=True)
linhas = list(wb["365 Desafios"].iter_rows(min_row=2, values_only=True))
listas = {k: [] for k in ("ciclos", "objetivos", "tecnicas", "enquadramentos", "linguagens", "equipamentos")}


def indice(nome, valor):
    lista = listas[nome]
    if valor not in lista:
        lista.append(valor)
    return lista.index(valor)


dias = [[r[3], indice("ciclos", r[2]), indice("objetivos", r[4]), indice("tecnicas", r[7]),
         indice("enquadramentos", r[8]), indice("linguagens", r[9]), indice("equipamentos", r[10])] for r in linhas if r[0]]
dados = dict(listas, editorias=[list(r) for r in wb["Linha Editorial"].iter_rows(min_row=2, values_only=True) if r[0]], dias=dias)

with open(DESTINO, "w", encoding="utf-8") as f:
    f.write("/* 365 Clicks — calendário editorial dos 365 desafios\n"
            "   Gerado por tools/importar_calendario.py a partir de " + ORIGEM + ".\n"
            "   Cada dia: [tema, ciclo, objetivo, técnica, enquadramento, linguagem, equipamento] (índices nas listas).\n"
            "   Não edite à mão: altere a planilha e rode o script de novo. */\n")
    f.write("window.CALENDARIO_365 = " + json.dumps(dados, ensure_ascii=False, separators=(",", ":")) + ";\n")
print(f"{len(dias)} dias gravados em {DESTINO}")
