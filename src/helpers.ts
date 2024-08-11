function askNotificationAccess() {
    try {
        if (typeof window != 'undefined') {
            if ("Notification" in window) {
                Notification.requestPermission().then((permission) => {
                    return permission == "granted" ? true: false;
                });
            }
        }
        return false;
    } catch (error: any) {
        return false;
    }
}

function sendNotification(text: string) {
    const toNotify = askNotificationAccess();
    if (!toNotify)
        return false;
    const notification  = new Notification("Batch Transaction", {body: text});
    
}