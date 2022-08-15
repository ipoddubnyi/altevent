<template>
    <div class="page-reservation">
        <div class="p-1">
            <div v-if="reservation">
                <div class="reservation-card ml-auto mr-auto mb-1">
                    <div class="mb-1">
                        <h2 class="mb-0.5">{{ reservation.name }}</h2>
                        <p>Телефон: {{ reservation.phone }}</p>
                        <p>Почта: {{ reservation.email }}</p>
                        <p v-if="reservation.comment" class="mt-0.5"><small>{{ reservation.comment }}</small></p>

                        <p class="mt-2 mb-0.5">Событие:</p>
                        <div v-if="event" class="text-sm ml-1">
                            <p>{{ event.name }}</p>
                            <p>{{ event.description }}</p>
                            <p>{{ `Свободных мест: ${event.capacity - event.reservations.length}` }}</p>
                            <p v-if="event.allDay">
                                {{ `${formatDate(event.startDate, "L")} - ${formatDate(event.endDate, "L")}` }}
                            </p>
                            <p v-else>
                                {{ `${formatDate(event.startDate, "L")} ${event.startTime} - ${formatDate(event.endDate, "L")} ${event.endTime}` }}
                            </p>
                        </div>
                    </div>

                    <div class="flex">
                        <alt-button
                            class="w-100"
                            type="primary"
                            @click="showModalUpdate"
                        >Изменить</alt-button>

                        <alt-button
                            class="w-100"
                            type="danger"
                            @click="confirmDelete"
                        >Удалить</alt-button>
                    </div>
                </div>

                <div class="text-center">
                    <alt-button
                        type="primary"
                        @click="relocateToEvents"
                    >&lt;&lt; К событиям</alt-button>
                </div>
            </div>
            <div v-else>Резервация не найдена</div>
        </div>

        <modal-component :handler="reservationModal" />
    </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss">
.page-reservation {
    background: var(--alt-main-background);

    .reservation-card {
        width: 20rem;
        border: 1px solid #333333;
        padding: 0.5rem;
    }
}
</style>
