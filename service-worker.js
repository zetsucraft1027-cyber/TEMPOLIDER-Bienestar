self.addEventListener("install", function(event) {
    console.log("Service Worker instalado.");
    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    console.log("Service Worker activado.");
});

self.addEventListener("notificationclick", function(event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function(clientes) {

            for (let cliente of clientes) {
                if ("focus" in cliente) {
                    return cliente.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow("/");
            }

        })
    );
});