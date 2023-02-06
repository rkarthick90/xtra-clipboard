chrome.runtime.onMessage.addListener((e, t, n) => {
  if (e && e.action && 'context_menu_paste' === e.action) {
    let t = !1,
      o = window.top.document,
      a = 0,
      r = window,
      l = e.text;
    for (; !1 === t; )
      if (
        (o && o.activeElement
          ? ((o = o.activeElement) instanceof HTMLIFrameElement &&
              ((r = o.contentDocument), (o = o.contentDocument)),
            o && ('on' === o.designMode || o.contentEditable) && (t = !0))
          : (t = !0),
        ++a > 100)
      )
        return (
          (t = !0),
          alert("Sorry, couldn't find target to insert text into."),
          n(!1),
          !1
        );
    if (
      'input' === o.tagName.toLowerCase() ||
      'textarea' === o.tagName.toLowerCase()
    ) {
      let e = o.selectionStart,
        t = o.selectionEnd;
      (o.value =
        o.value.substring(0, e) + l + o.value.substring(t, o.value.length)),
        o.setSelectionRange(e + l.length, e + l.length);
    } else if (o.contentEditable) {
      let e = r.getSelection().getRangeAt(0);
      e.deleteContents();
      let t = (l = l.replace(
        /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
        '$1<br/>$2'
      )).split('<br/>');
      for (let n = t.length - 1; n >= 0; n--)
        e.insertNode(document.createTextNode(t[n])),
          n > 0 && e.insertNode(document.createElement('br'));
      e.collapse(!0), e.detach();
    }
    return n({ paste: !0 }), !0;
  }
});
