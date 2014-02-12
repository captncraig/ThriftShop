minimizeSidebar = function () {
    var animationDuration = 200;
    $('#sidebar-toggle').animate({left:"0"}, animationDuration);
    $('#sidebar').animate({width:"5px"}, animationDuration);
    $('#sidebar div').animate({opacity:0}, animationDuration);
    var newMainWidth = $(document).width() - 5;
    $('#main').animate({width:newMainWidth + "px", "margin-left":"5px"}, animationDuration);
    $('#sidebar-toggle img').attr('src', 'img/tri_arrow_right.png');
};

maximizeSidebar = function () {
    var animationDuration = 200;
    $('#sidebar-toggle').animate({left:"350px"}, animationDuration);
    $('#sidebar').animate({width:"340px"}, animationDuration);
    $('#sidebar div').animate({opacity:1}, animationDuration);
    $('#sidebar-toggle img').attr('src', 'img/tri_arrow_left.png');
    var newMainWidth = $(document).width() - 340;
    $('#main').animate({width:newMainWidth + "px", "margin-left":340 + "px"}, animationDuration);
};
var isSidebarMaximized = true;

toggleSidebar = function () {
    if (isSidebarMaximized) {
        minimizeSidebar();
    }
    else {
        maximizeSidebar();
    }
    isSidebarMaximized = !isSidebarMaximized;
};

$("#sidebar-toggle").click(toggleSidebar);