function polling(): void {
    console.debug("polling");
    setTimeout(polling, 1000 * 30);
}

polling();
