
document.addEventListener("DOMContentLoaded", () => {
    const downloadForm = document.getElementById("downloadForm");
    const videoUrl = document.getElementById("videoUrl");
    const formMessage = document.getElementById("formMessage");
    const analyzeBtn = document.getElementById("analyzeBtn");

    // Vérifier que les éléments existent
    if (!downloadForm || !videoUrl || !formMessage) {
        console.error("Certains éléments HTML sont introuvables.");
        return;
    }

    // Reconnaître la plateforme à partir du lien
    function detectPlatform(url) {
        const hostname = url.hostname.toLowerCase();

        if (
            hostname === "youtube.com" ||
            hostname.endsWith(".youtube.com") ||
            hostname === "youtu.be"
        ) {
            return "YouTube";
        }

        if (
            hostname === "tiktok.com" ||
            hostname.endsWith(".tiktok.com")
        ) {
            return "TikTok";
        }

        if (
            hostname === "facebook.com" ||
            hostname.endsWith(".facebook.com") ||
            hostname === "fb.watch"
        ) {
            return "Facebook";
        }

        if (
            hostname === "instagram.com" ||
            hostname.endsWith(".instagram.com")
        ) {
            return "Instagram";
        }

        if (hostname.includes("anime-sama")) {
            return "Anime Sama";
        }

        if (hostname.includes("moviebox")) {
            return "MovieBox";
        }

        return null;
    }

    // Afficher un message à l'utilisateur
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }

    // Vérifier le lien envoyé
    downloadForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const enteredUrl = videoUrl.value.trim();

        if (enteredUrl === "") {
            showMessage("Veuillez coller un lien avant de continuer.", "error");
            return;
        }

        let parsedUrl;

        try {
            parsedUrl = new URL(enteredUrl);
        } catch (error) {
            showMessage("Ce lien n'est pas valide. Vérifiez votre adresse.", "error");
            return;
        }

        // Autoriser uniquement les liens HTTP et HTTPS
        if (
            parsedUrl.protocol !== "https:" &&
            parsedUrl.protocol !== "http:"
        ) {
            showMessage("Ce type de lien n'est pas autorisé.", "error");
            return;
        }

        const platform = detectPlatform(parsedUrl);

        if (!platform) {
            showMessage(
                "Plateforme non reconnue. Vérifiez le lien que vous avez collé.",
                "error"
            );
            return;
        }

        showMessage(
            `Lien reconnu ! Plateforme détectée : ${platform}. La fonction de téléchargement sera ajoutée ultérieurement.`,
            "success"
        );

        console.log("Plateforme :", platform);
        console.log("Lien :", parsedUrl.href);
    });

    // Effacer le message lorsque l'utilisateur modifie le lien
    videoUrl.addEventListener("input", () => {
        formMessage.textContent = "";
        formMessage.className = "form-message";
    });

    console.log("GLORIOUS DOWN est prêt !");
});
