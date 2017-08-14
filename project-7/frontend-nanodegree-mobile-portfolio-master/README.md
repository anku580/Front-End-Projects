## Website Performance Optimization portfolio project
_____________________________________________________________________
This is basically a simple project which is made so that to increase the speed of the loading of webpage by following the critical rendering path.
#
## HOW TO RUN THE WEBSITE
#

To open the website open the index.html file to begin the website.

#
## HOW OPTIMIZATION IS ACHIEVED
#
**Step1-**
 I have used media = "print" in index.html file so that it does not block rendering.
**Step2-**
After then I have put all the style.css in index.html. I have inline all the css so that it follows critical rendering path
**Step3-**
I have included script files at the end because according to critical rendering path java script should come after the css to make website more optimized. With this pag loading speed becomes less and it loads much faster than the previous one.
#
## PIZZA.HTML
_____________________________________________________________________
Pizza.html is a project in which all the junks has to be removed to make the website efficiently working using RAIL(for this you have to watch videos).
#
## HOW TO RUN PIZZA FILE
#

To open the file open the pizza.html file to begin the website.
#
## HOW OPTIMIZATION IS ACHIEVED
#
**Step1-**
Firstly changes have been made in views/js/main.js file 425 line. Here, some functions have been removed and selectorall has been stored in one variable to avoid calling again and again. this improves major layout design and pizza now changes the sizes in less than 1ms.
**Step2-**
In the same file mentioned in step1 line no. 492 and 496 , Seperated loops have been created so that style works only after the layout have changed in order to achive the smoothness to the webpage.
______________________________________________________________________
