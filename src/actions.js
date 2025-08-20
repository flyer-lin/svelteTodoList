export function selectOnFocus(node) {
    if (node && node.select === "function") {
        const onFocus = () => node.select();
        node.addEventListener("focus", onFocus);
        return {
            destroy() {
                node.removeEventListener("focus", onFocus);
            }
        };
    }
}