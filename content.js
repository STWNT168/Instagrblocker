chrome.storage.sync.get(['blockAll', 'hideReels'], (data) => {
  // Option A: Hard block entire site
  if (data.blockAll) {
    document.documentElement.innerHTML = `
      <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#090d16;
        color:#ffffff;
        font-family:sans-serif;
        text-align:center;
      ">
        <h1 style="font-size: 40px; margin-bottom: 8px;">🚫 Focus Mode Active</h1>
        <p style="color:#94a3b8; font-size:18px;">Instagram is currently blocked to help you stay productive.</p>
      </div>
    `;
    return;
  }

  // Option B: Selective blocking (Hides Reels, Explore, and Main Feed)
  if (data.hideReels !== false) {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Hide Reels link in sidebar/navigation */
      a[href*="/reels/"], 
      a[href*="/explore/"] {
        display: none !important;
      }

      /* Hide main timeline feed while keeping DMs/Messages accessible */
      main[role="main"] section > div {
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }
});
