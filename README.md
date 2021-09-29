# DnDWithTouch
Drag and Drop with Touch API - now enhanced with two drop zones, and the ability to work correctly even when the page can be scrolled.

The original code comes from [deepakkadarivel](https://github.com/deepakkadarivel/DnDWithTouch) based on this Medium article: [Drag and Drop (DnD) for mobile browsers | by Deepak Kadarivel | Medium](https://medium.com/@deepakkadarivel/drag-and-drop-dnd-for-mobile-browsers-fc9bcd1ad3c5)

In 2020, [lenniea](https://github.com/lenniea/DnDWithTouch) enhanced the code by adding colors to the boxes, creating two drop zones and fixing some problems.

In this fork, the following fixes are made further:

* Some text is added to make the page lengthy. This helps test the behavior when the drop zones and elements are scrolled away from their initial positions.
  * On doing the above, it was discovered that the page will scroll during the touch events. This had been fixed.
* Many more fixes became necessary as the original page was written with the assumption that the page is frozen in position, not scrollable.
  * But generally on the Web, most pages are long enough to scroll, so a "drag and drop" solution must work correctly even if the page is scrollable or scrolled.
* Code had been cleaned up and refactored. Logging was enhanced to show more detail.

Feel free to fork and modify further! Issues and pull requests are welcome. ~ [ADTC](https://github.com/ADTC/DnDWithTouch)
