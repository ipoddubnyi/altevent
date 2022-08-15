<template>
    <div class="page-events">
        <div class="p-1">
            <full-calendar ref="fullCalendar" class="alt-calendar" :options="calendarOptions" />
        </div>

        <modal-component :handler="reservationModal" />
    </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
.page-events {
    background: var(--alt-main-background);
}

.alt-calendar {
    .fc-event {
        cursor: pointer;
    }

    // .fc-toolbar-title {
    //     text-transform: capitalize;
    // }
}
</style>
