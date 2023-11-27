

function meropatro(settings, id, rect) {
    const NMO = [
        { nepali: "बैशाख", english: "Apr-May" },
        { nepali: "जेष्ठ", english: "May-Jun" },
        { nepali: "अषाढ", english: "Jun-Jul" },
        { nepali: "श्रावण", english: "Jul-Aug" },
        { nepali: "भाद्र", english: "Aug-Sep" },
        { nepali: "असोज", english: "Sep-Oct" },
        { nepali: "कार्तिक", english: "Oct-Nov" },
        { nepali: "मंसिर", english: "Nov-Dec" },
        { nepali: "पुष", english: "Dec-Jan" },
        { nepali: "माघ", english: "Jan-Feb" },
        { nepali: "फाल्गुन", english: "Feb-Mar" },
        { nepali: "चैत्र", english: "Mar-Apr" },
    ];

    const nDA = ["आइत", "सोम", "मगल", "बुध", "बिहि", "शुक्र", "शनि"];

    const DIE = nepaliDate.NEPALI_YEARS;
    const ns = { year: 2080, month: 4, day: 14 };
    const nepaliNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

    const startYear = Math.min(...Object.keys(DIE).map((year) => parseInt(year)));
    const endYear = Math.max(...Object.keys(DIE).map((year) => parseInt(year)));

    const sma = document.getElementById("sma");
    const min = $("#" + id).attr("min");
    const max = $("#" + id).attr("max");
    const readonly = $("#" + id).attr("readonly");
    const sYn = document.getElementById("sYn");

    function populateDropdowns() {
        sYn.innerHTML = "";
        sma.innerHTML = "";

        for (let year = startYear; year <= endYear; year++) {
            const optionYear = document.createElement("option");
            optionYear.value = year;
            optionYear.textContent = year.toString();
            sYn.appendChild(optionYear);
        }

        for (let i = 0; i < NMO.length; i++) {
            const oM = document.createElement("option");
            const nMn = NMO[i].nepali;
            const s = NMO[i].english;
            oM.value = i;
            oM.textContent = `${nMn} - ${s}`;
            sma.appendChild(oM);
        }
    }

    function addClickListenerToDates() {
        const nepaliDates = document.querySelectorAll(".calendar td.date-td");
        nepaliDates.forEach((date) => {
            date.addEventListener("click", () => {
                const selectedDate = date.textContent.trim();
                updSelDate(selectedDate);
                const cWRA = document.querySelector("#calendar-wrapper");
                cWRA.style.display = "none";
            });
        });
    }

    function uC() {
        const Syea = parseInt(sYn.value);
        const selectedMonth = parseInt(sma.value);
        createMonthCalendar(Syea, selectedMonth);
        addClickListenerToDates();
    }

    sYn.addEventListener("change", uC);
    sma.addEventListener("change", uC);

    function getYearToDayIndex(year) {
        const convertedToEnglish = nepaliDate.getEnglishDate(year, 1, 1);
        return convertedToEnglish.getDay();
    }

    function createMonthCalendar(year, month) {
        const table = document.querySelector(".calendar");
        table.innerHTML = "";

        let startDay = 14;
        if (month > 0) {
            for (let i = 0; i < month; i++) {
                startDay += DIE[year][i];
            }
        }

        let sI;
        sI = (getYearToDayIndex(year) + startDay - 1) % nDA.length;

        const daysRow = document.createElement("tr");
        for (let i = 0; i < nDA.length; i++) {
            const td = document.createElement("th");
            td.textContent = nDA[i];
            td.style.fontFamily = "Poppins, sans-serif";

            daysRow.appendChild(td);
        }
        table.appendChild(daysRow);

        const totalDaysInMonth = DIE[year][month];

        let weeks = Math.ceil((totalDaysInMonth + sI) / nDA.length);

        if (sI > 0 && weeks === 5) {
            weeks += 1;
        }

        let dayCounter = 1;
        let blankPage = true;
        for (let week = 0; week < weeks; week++) {
            const dateRow = document.createElement("tr");
            for (let i = 0; i < nDA.length; i++) {
                const td = document.createElement("td");
                if (blankPage) {
                    if (week === 0 && i < sI) {
                        td.className = "empty-cell";
                    } else {
                        blankPage = false;
                    }
                } else if (dayCounter <= totalDaysInMonth) {
                    td.textContent = toNepaliNumber(dayCounter);
                    td.style.fontSize = "14px";
                    td.style.fontWeight = "bold";
                    td.classList.add("date-td");

                    const smspan = document.createElement("span");

                    const englishDate = nepaliDate
                        .getEnglishDate(
                            parseInt(sYn.value),
                            parseInt(sma.value) + 1,
                            dayCounter
                        );

                    const englishDay = englishDate.getDate();

                    smspan.textContent = englishDay.toString();
                    smspan.className = "nepali-date";

                    td.appendChild(smspan);

                    if (i === 6) {
                        td.classList.add("red");
                        smspan.classList.add("red");
                    }

                    if (max !== undefined) {
                        const maxEnglishDate = new Date(max);
                        maxEnglishDate.setHours(0, 0, 0, 0);

                        if (englishDate > maxEnglishDate) {
                            td.classList.add("disabled");
                        }
                    }

                    if (min !== undefined) {
                        const minEnglishDate = new Date(min);
                        minEnglishDate.setHours(0, 0, 0, 0);

                        if (englishDate < minEnglishDate) {
                            td.classList.add("disabled");
                        }
                    }

                    settings.disabledDates.forEach((e) => {
                        if (e.endingDate === undefined) {
                            if (year > e.year) {
                                td.classList.add("disabled");
                            }
                            if (year === e.year && month > (e.month ? e.month - 1 : 0)) {
                                td.classList.add("disabled");
                            }

                            if (
                                year === e.year &&
                                month === (e.month ? e.month - 1 : 0) &&
                                dayCounter > e.startingDate &&
                                (e.endingDate === undefined || dayCounter > e.endingDate)
                            ) {
                                td.classList.add("disabled");
                            }
                        } else if (e.startingDate === undefined) {
                            if (year < e.year) {
                                td.classList.add("disabled");
                            }
                            if (year === e.year && month < (e.month ? e.month - 1 : 0)) {
                                td.classList.add("disabled");
                            }

                            if (year === e.year && month === (e.month ? e.month - 1 : 0) &&
                                dayCounter > 1 &&
                                dayCounter <= e.endingDate + 1) {
                                td.classList.add("disabled");
                            }
                        }
                        else {
                            if (
                                year === e.year &&
                                month === (e.month ? e.month - 1 : 0) &&
                                dayCounter > e.startingDate &&
                                dayCounter <= e.endingDate + 1
                            ) {
                                td.classList.add("disabled");
                            }
                        }
                    });

                    const dSel = document.getElementById(id).value;
                    datesplited = dSel.split("/");
                    const selectedDate = new Date(`${datesplited[2]}-${datesplited[1]}-${datesplited[0]}`);
                    selectedDate.setHours(0, 0, 0, 0);

                    const date = nepaliDate.getNepaliDate(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        new Date().getDate()
                    );
                    if (
                        year == date.year &&
                        month == date.month - 1 &&
                        dayCounter == date.day
                    ) {
                        td.classList.add("todaydate");
                    }
                    if (selectedDate.getTime() === englishDate.getTime()) {
                        td.classList.add("selectedDate");
                    }
                    dayCounter++;
                } else {
                    td.textContent = "";
                    td.className = "empty-cell";
                }
                dateRow.appendChild(td);
            }
            table.appendChild(dateRow);
        }

        const pMA = document.getElementById("pMA");
        pMA.disabled = year === startYear && month === 0;

        const nMA = document.getElementById("nMA");
        nMA.disabled = year === 2081 && month === 11;
    }

    function prevMonth() {
        const Syea = parseInt(sYn.value);
        let selectedMonth = parseInt(sma.value);
        if (Syea === startYear && selectedMonth === 0) {
            return;
        }
        if (selectedMonth === 0) {
            selectedMonth = 11;
            sYn.value = Syea - 1;
        } else {
            selectedMonth--;
        }
        sma.value = selectedMonth;
        uC();
    }

    function nextMonth() {
        const Syea = parseInt(sYn.value);

        let selectedMonth = parseInt(sma.value);
        if (Syea === 2084 && selectedMonth === 11) {
            return;
        }
        if (selectedMonth === 11) {
            selectedMonth = 0;
            sYn.value = Syea + 1;
        } else {
            selectedMonth++;
        }
        sma.value = selectedMonth;
        uC();
    }

    function toNepaliNumber(number) {
        return number
            .toString()
            .replace(/\d/g, (digit) => nepaliNumerals[parseInt(digit)]);
    }

    populateDropdowns();
    uC();

    function showCalendar() {
        const cWRA = document.getElementById("calendar-wrapper");
        cWRA.style.display = "block";
        cWRA.style.position = "fixed";

        const inputField = document.getElementById(id);
        const inputRect = inputField.getBoundingClientRect();

        const pMA = document.getElementById("pMA");
        const nMA = document.getElementById("nMA");

        pMA.addEventListener("click", prevMonth);
        nMA.addEventListener("click", nextMonth);

        const selDate = inputField.value === '' ? new Date() : new Date(inputField.value);

        selDate.setHours(0, 0, 0, 0);

        const selDateNepali = nepaliDate.getNepaliDate(
            selDate.getFullYear(),
            selDate.getMonth() + 1,
            selDate.getDate()
        );

        // Calculate the position of the datepicker relative to the input field
        const datePickerHeight = cWRA.offsetHeight /* calculate the height of your datepicker */;
        const datePickerWidth = cWRA.offsetWidth /* calculate the height of your datepicker */;

        // Adjust for a zoom level of 0.9 (zoomed out)
        const zoomFactor = settings.zoomFactor;

        const unzoomedLeft = inputRect.left * zoomFactor;
        const unzoomedBottom = (inputRect.bottom + 10) * zoomFactor;
        const unzoomedDatePickerTop = (inputRect.top * zoomFactor) - datePickerHeight;

        // Check if there is enough space left of the input field
        const spaceRight = window.innerWidth - (inputRect.right * zoomFactor);

        if (spaceRight < datePickerWidth) {
            cWRA.style.right = `${spaceRight * zoomFactor}px`;
        } else {
            cWRA.style.left = `${unzoomedLeft}px`;
        }

        // Check if there is enough space below the input field
        const spaceBelow = window.innerHeight - inputRect.bottom;

        if (spaceBelow < datePickerHeight) {
            // Not enough space below, display datepicker above
            // Set the top position of the datepicker
            cWRA.style.top = `${unzoomedDatePickerTop + 5}px`;
        } else {
            // Enough space below, display datepicker below
            // Set the top position of the datepicker
            cWRA.style.top = `${unzoomedBottom}px`;
        }

        cWRA.style.zIndex = 1050;

        sma.value = selDateNepali.month - 1;
        sYn.value = selDateNepali.year;

        uC();
    }

    if (readonly !== 'readonly') {
        showCalendar();
    }

    function hideCalendar(event) {
        const cWRA = document.querySelector("#calendar-wrapper");
        if (
            event.target !== document.getElementById(event.target.id) &&
            !cWRA.contains(event.target)
        ) {
            cWRA.style.display = "none";
        }
    }

    document.addEventListener("click", hideCalendar);

    function updSelDate(selectedDate) {
        const inputField = document.getElementById(id);

        const Syea = parseInt(sYn.value);
        let selectedMonth = parseInt(sma.value) + 1;

        const nepaliNumeralsRegex = new RegExp(`[${nepaliNumerals.join("")}]`, "g");
        const formattedDateNepali = selectedDate
            .match(nepaliNumeralsRegex)
            .join("");

        const formattedDateEnglish = toEnglishNumber(formattedDateNepali);

        selectedMonth = selectedMonth.toString().padStart(2, "0");

        const convertedToEnglish = nepaliDate.getEnglishDate(Syea, selectedMonth, formattedDateEnglish);

        const month = (convertedToEnglish.getMonth() + 1).toString().padStart(2, '0');
        const day = convertedToEnglish.getDate().toString().padStart(2, '0');
        const year = convertedToEnglish.getFullYear();

        inputField.valueAsDate = new Date(Date.UTC(year, month - 1, day));

        $(inputField).change();
    }

    function toEnglishNumber(nepaliNumber) {
        const nepaliNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
        return nepaliNumber.replace(/[०-९]/g, (digit) =>
            nepaliNumerals.indexOf(digit)
        );
    }
}

//let isEventListenersAdded = false;

(function ($) {
    $.fn.nepaliDatePicker = function (options) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            disabledDates: [],
            zoomFactor: 1.0,
        }, options);

        this.each(function () {
            var inputElement = this;

            inputElement.addEventListener("click", function (e) {
                e.preventDefault();
                const rect = document.getElementById(e.target.id).getBoundingClientRect();

                const cWRAs = document.getElementById("calendar-wrapper");

                // Check if the calendar already exists; if so, remove it
                if (cWRAs) {
                    cWRAs.parentNode.removeChild(cWRAs);
                }

                if (document.getElementById("calendar-wrapper") == null) {
                    const cWRA = document.createElement("div");
                    cWRA.id = "calendar-wrapper";
                    document.body.appendChild(cWRA);

                    var calendarNavigation = document.createElement("div");
                    calendarNavigation.className = "calendar-navigation";

                    var pMA = document.createElement("span");
                    pMA.className = "arrow";
                    pMA.id = "pMA";
                    pMA.innerHTML = '<i class="fa fa-chevron-left"></i>';

                    var sma = document.createElement("select");
                    sma.id = "sma";
                    sma.className = "month-dropdown";

                    var sYn = document.createElement("select");
                    sYn.id = "sYn";
                    sYn.className = "year-dropdown";

                    var nMA = document.createElement("span");
                    nMA.className = "arrow";
                    nMA.id = "nMA";
                    nMA.innerHTML = '<i class="fa fa-chevron-right"></i>';

                    var calendarTable = document.createElement("table");
                    calendarTable.className = "calendar noDataTable";

                    var tableRow = document.createElement("tr");
                    var tableHeader = document.createElement("th");
                    tableHeader.colSpan = "7";

                    calendarNavigation.appendChild(pMA);
                    calendarNavigation.appendChild(sma);
                    calendarNavigation.appendChild(sYn);
                    calendarNavigation.appendChild(nMA);

                    tableRow.appendChild(tableHeader);
                    calendarTable.appendChild(tableRow);

                    cWRA.appendChild(calendarNavigation);
                    cWRA.appendChild(calendarTable);
                }
                meropatro(settings, e.target.id, rect);
            });
        });
    };
}(jQuery));

window.addEventListener("scroll", () => {
    const cWRA = document.querySelector("#calendar-wrapper");
    if (cWRA) { cWRA.style.display = "none"; }
})