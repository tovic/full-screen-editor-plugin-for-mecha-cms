(function(w, d, base) {
    if (!base.composer) return;
    var is_expand = false,
        name = 'expand plugin-full-screen-editor',
        the_base = d.documentElement,
        the_base_class = the_base.className,
        the_actions = d.getElementsByName('extension')[0].parentNode,
        the_languages = base.languages.MTE.plugin_full_screen_editor;
    the_actions.className = the_actions.className + ' full-screen-editor-action-group';
    function expand_collapse(e, editor) {
        var the_toggle = e.target.href ? e.target : e.target.parentNode,
            the_icon = the_toggle.firstChild,
            the_outer = editor.grip.area.parentNode;
        editor.grip.select();
        editor.grip.area.removeAttribute('style');
        if (!is_expand) {
            the_base.className = the_base_class + ' MTE-editor-is-expanded';
            the_toggle.hash = 'compress';
            the_toggle.title = the_languages[1] + ' (' + the_languages[2] + ')';
            the_icon.className = the_icon.className.replace(/-expand/, '-compress');
            the_outer.className = the_outer.className + ' active';
            is_expand = true;
            base.fire('on_full_screen_enter', {
                'event': e,
                'editor': editor
            });
        } else {
            the_base.className = the_base_class;
            the_toggle.hash = 'expand';
            the_toggle.title = the_languages[0] + ' (' + the_languages[2] + ')';
            the_icon.className = the_icon.className.replace(/-compress/, '-expand');
            the_outer.className = the_outer.className.replace(/ active/, "");
            is_expand = false;
            base.fire('on_full_screen_exit', {
                'event': e,
                'editor': editor
            });
        }
        base.fire('on_full_screen_toggle', {
            'event': e,
            'editor': editor
        });
    }
    var c = base.composers, n;
    for (var i in c) {
        n = 'composer_' + c[i].replace(/\[\]/, '[' + i + ']');
        base[n].button(name, {
            title: the_languages[0] + ' (' + the_languages[2] + ')',
            position: 1,
            click: expand_collapse
        });
        base[n].shortcut('ctrl+shift+f', function(e, the_base) {
            var nav = e.target.previousSibling || e.target.nextSibling,
                a = nav ? nav.getElementsByClassName('plugin-full-screen-editor')[0] : false;
            if (a && a.nodeName.toLowerCase() === 'a') {
                return expand_collapse({target: a}, the_base), false;
            }
        });
    }
})(window, document, DASHBOARD);