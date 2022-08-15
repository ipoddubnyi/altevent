<template>
    <div class="page-calendar">
        <div class="px-1 pb-1">
            <full-calendar ref="fullCalendar" class="alt-calendar" :options="calendarOptions" />
        </div>

        <modal-component :handler="eventModal" />
    </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
.alt-calendar {
    .fc-event {
        cursor: pointer;
    }
}
</style>
