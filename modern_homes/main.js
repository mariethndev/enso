const detailsInfos = document.getElementById("detailsInfos");

const data = [
    { label: "Features", value: "3 Bed / 3 Bath" },
    { label: "Materials", value: "White Oak, Quartz, Ecotek" },
    { label: "Renovation Date", value: "Summer 2023" },
    { label: "Lot Size", value: "3,203 sq ft." }
];

data.forEach(item => {
    const block = document.createElement("div");
    block.classList.add("info-block");

    const label = document.createElement("div");
    label.classList.add("label");
    label.textContent = item.label;

    const value = document.createElement("div");
    value.classList.add("value");
    value.textContent = item.value;

    block.appendChild(label);
    block.appendChild(value);

    detailsInfos.appendChild(block);
});
