import _ from 'lodash';
import { DEFAULT_PANEL_WIDTH, DEFAULT_PANEL_HEIGHT } from './panel_state';

export class PanelUtils {
  /**
   * Fills in default parameters where not specified.
   * @param {PanelState} panel
   */
  static initializeDefaults(panel) {
    panel.size_x = panel.size_x || DEFAULT_PANEL_WIDTH;
    panel.size_y = panel.size_y || DEFAULT_PANEL_HEIGHT;

    if (!panel.id) {
      // In the interest of backwards comparability
      if (panel.visId) {
        panel.id = panel.visId;
        panel.type = 'visualization';
        delete panel.visId;
      } else {
        throw new Error('Missing object id on panel');
      }
    }
  }

  /**
   * Ensures that the panel object has the latest size/pos info.
   * @param {PanelState} panel
   * @param {Element} panelElement - jQuery element representing the element in the UI
   */
  static refreshSizeAndPosition(panel, panelElement) {
    const data = panelElement.coords().grid;
    panel.size_x = data.size_x;
    panel.size_y = data.size_y;
    panel.col = data.col;
    panel.row = data.row;
  }

  /**
   * Returns the panel with the given panelIndex from the panels array (*NOT* the panel
   * at the given index).
   * @param panelIndex {number} - Note this is *NOT* the index of the panel in the panels array.
   * panelIndex is really a panelId, but is called panelIndex for BWC reasons.
   * @param panels {Array<Object>}
   */
  static findPanelByPanelIndex(panelIndex, panels) {
    return _.find(panels, panel => panel.panelIndex === panelIndex);
  }

  static initPanelIndexes(panels) {
    // find the largest panelIndex in all the panels
    const maxIndex = this.getMaxPanelIndex(panels);

    // ensure that all panels have a panelIndex
    panels.forEach((panel) => {
      if (!panel.panelIndex) {
        panel.panelIndex = maxIndex + 1;
      }
    });
  }

  static getMaxPanelIndex(panels) {
    const maxId = panels.reduce((id, panel) => {
      const panelId = panel.panelIndex || id;
      return Math.max(id, panelId);
    }, 0);
    return maxId + 1;
  }
}
