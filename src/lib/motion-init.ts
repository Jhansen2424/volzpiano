// Runs before first paint (inlined in the root layout) so the paused state is
// applied immediately, with no flash of animation. Kept free of React so the
// server layout can import it.
export const MOTION_STORAGE_KEY = "volz-motion";

export const MOTION_INIT_SCRIPT = "(function(){try{var s=localStorage.getItem(\"volz-motion\");var r=window.matchMedia&&window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches;if(s===\"paused\"||(s!==\"playing\"&&r)){document.documentElement.setAttribute(\"data-motion\",\"paused\");}}catch(e){}})();";
