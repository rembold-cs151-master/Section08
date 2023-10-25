"""
Recreates the Matrix title screen effect
"""


from pgl import GWindow, GLabel, GRect
import random

GWINDOW_WIDTH = 1000
GWINDOW_HEIGHT = 500
N_COLUMNS = 50
TIME_STEP = 10
LABEL_FONT = "14px 'Sans-Serif'"
LABEL_COLOR = "#66CC66"
KATAKANA_START = 0x30A0
KATAKANA_END = 0x3100

# Derived constant
COLUMN_WIDTH = GWINDOW_WIDTH / N_COLUMNS

def matrix_titles():

    def step():
        """ Adds a new katakana character to the end of a random column """



    gw = GWindow(GWINDOW_WIDTH, GWINDOW_HEIGHT)

# Startup code

if __name__ == "__main__":
    matrix_titles()
