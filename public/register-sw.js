if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
            const nw = reg.installing;
            if (!nw) return;
            nw.addEventListener("statechange", () => {
                if (
                    nw.state === "installed" &&
                    navigator.serviceWorker.controller
                ) {
                    // TODO:show modal if update is ready
                    nw.postMessage({ type: "SKIP_WAITING" });
                }
            });
        });
    });

    // refreshing the page if controller has changed
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}
