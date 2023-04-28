export function scrollToAnchor() {
    if (!window || !location || !location.hash)
        return;

    const navigationHeight = document.querySelector(".VPNav").getBoundingClientRect().height;
    const itemVerticalPosition = document.querySelector(location.hash).getBoundingClientRect().top;

    window.scrollTo({
        top: itemVerticalPosition - navigationHeight + 1,
        behavior: "auto"
    });
}
