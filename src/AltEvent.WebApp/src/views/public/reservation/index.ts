import { Options, Vue } from "vue-class-component";
import { h } from "vue";
import moment from "moment";
import AltButton from "@/core/components/alt-controls/alt-button.vue";
import ModalComponent from "@/core/components/alt-modal/modal.component.vue";
import { Event, Reservation } from "@/core/models";
import { ReservationUseCase } from "@/core/usecases/reservation.usecase";
import { ReservationUpdateDto } from "@/core/dtos";
import { ReservationModal } from "./reservation.modal";

@Options({
    components: { AltButton, ModalComponent },
})
export default class ReservationPage extends Vue {
    private ReservationUseCase = new ReservationUseCase();

    private reservationId: number | null = null;
    private reservationCode: number | null = null;
    private reservation: Reservation | null = null;
    private event: Event | null = null;
    private loaded = false;

    private reservationModal = new ReservationModal();

    public created(): void {
        this.reservationModal.onUpdate = this.update.bind(this);
    }
    
    public async mounted(): Promise<void> {
        await this.init();
    }

    private async init(): Promise<void> {
        try {
            this.loaded = false;
            await this.selectData();
            this.loaded = true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    private async selectData(): Promise<boolean> {
        try {
            this.$alt.loader.show();
            this.selectParams();
            await this.selectReservation();
            return true;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return false;
        } finally {
            this.$alt.loader.hide();
        }
    }

    private selectParams(): void {
        if (this.$route.params.reservationId) {
            this.reservationId = parseInt(this.$route.params.reservationId as string);
        }

        console.log(this.$route.query);
        

        if (this.$route.query.code) {
            this.reservationCode = parseInt(this.$route.query.code as string);
        }
    }

    private async selectReservation(): Promise<void> {
        try {
            if (!this.reservationId || !this.reservationCode) {
                return;
            }

            this.reservation = await this.ReservationUseCase.get(this.reservationId, this.reservationCode);

            // TODO: брать сразу из объекта Reservation
            this.event = await this.ReservationUseCase.getEvent(this.reservationId, this.reservationCode);
            
        } catch (e: any) {
            if (e.innerException?.response?.data?.code !== 0x0601) {
                throw e;
            }
        }
    }

    //

    private async showModalUpdate(): Promise<void> {
        if (!this.event || !this.reservation) {
            return;
        }

        const context = {
            event: this.event,
            reservation: this.reservation,
            readonly: this.event.reservations.length === this.event.capacity,
        };
        await this.reservationModal.show(context);
    }

    private async confirmDelete(): Promise<void> {
        if (!this.reservation) {
            return;
        }

        const confirm = await this.$alt.message.confirm(
            h("p", null, [
                "Вы уверены, что хотите удалить резервацию?",
            ]),
            "Удаление резервации",
            { okText: "Удалить", type: "warning" }
        );

        if (confirm) {
            await this.delete(this.reservation);
        }
    }

    private async relocateToEvents(): Promise<void> {
        try {
            if (this.event) {
                const companyId = this.event.companyId;
                await this.$router.push({ name: "events", params: { companyId } }).catch(() => {});
            }
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        }
    }

    private formatDate(dt: Date, format: string): string {
        return moment(dt).format(format);
    }

    //

    private async update(orig: Reservation, dto: ReservationUpdateDto): Promise<Reservation | null> {
        try {
            if (!this.reservationCode) {
                return null;
            }

            this.$alt.loader.show();
            const reservation = await this.ReservationUseCase.update(orig.id, this.reservationCode, dto);
            await this.selectData();
            this.$alt.toast.success("Резервация успешно изменена.");
            return reservation;
        } catch (e: any) {
            this.$alt.toast.error(e.message);
            return null;
        } finally {
            this.$alt.loader.hide();
        }
    }

    private async delete(reservation: Reservation): Promise<void> {
        try {
            if (!this.reservationCode) {
                return;
            }

            this.$alt.loader.show();
            await this.ReservationUseCase.delete(reservation.id, this.reservationCode);
            await this.selectData();
            this.reservation = null;
            this.$alt.toast.success("Резервация успешно удалена.");
            this.relocateToEvents();
        } catch (e: any) {
            this.$alt.toast.error(e.message);
        } finally {
            this.$alt.loader.hide();
        }
    }
}
