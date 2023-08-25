import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
    ApplicationState,
    AuthenticationService, NotificationPayload,
    NotificationService,
    selectLoggedInUser,
    SystemNotification,
    User,
    ConfigService,
    Menu
} from '@core';
import {Store} from '@ngrx/store';
import {Observable, Subscription, timer, Subject} from 'rxjs';
import {InvalidAccountDialogComponent} from '../../components';
import {filter, take, takeUntil, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'visa-authenticated-container',
    styleUrls: ['./authenticated-container.component.scss'],
    templateUrl: './authenticated-container.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AuthenticatedContainerComponent implements OnInit, OnDestroy {

    private static DISMISSED_NOTIFICATIONS = 'authenticated.dismissed.notifications';
    public user$: Observable<User>;
    public systemNotifications: SystemNotification[] = [];
    public dismissedSystemNotifications: Array<number> = new Array<number>();
    private _timerSubscription: Subscription = null;
    public extraMenus$: Observable<Menu[]>;
    private _destroy$: Subject<boolean> = new Subject<boolean>();


    constructor(private authenticationService: AuthenticationService,
                private notificationService: NotificationService,
                private dialog: MatDialog,
                private store: Store<ApplicationState>,
                private configService: ConfigService) {
        this.user$ = store.select(selectLoggedInUser).pipe(filter(user => !!user), take(1));
    }

    public ngOnInit(): void {

        this.user$.pipe(filter(user => user.id === '0')).subscribe(() => {
            this.dialog.open(InvalidAccountDialogComponent, {
                width: '550px',
            });
        });

        const dismissedNotificationsString = localStorage.getItem(AuthenticatedContainerComponent.DISMISSED_NOTIFICATIONS);
        if (dismissedNotificationsString != null && dismissedNotificationsString.length !== undefined) {
            dismissedNotificationsString.split(',').forEach(
                (element) => this.dismissedSystemNotifications.push(Number(element))
            );
        }

        this._timerSubscription = timer(0, 10000).subscribe(
            () => this.notificationService.getAll().subscribe((notificationPayload: NotificationPayload) => {
                const systemNotifications = notificationPayload.systemNotifications;

                this.cleanDismissedSystemNotifications(systemNotifications);
                this.filterSystemNotifications(systemNotifications);
            }));

        this.extraMenus$ = this.configService.load()
            .pipe(
                takeUntil(this._destroy$),
                map(config => config.extraMenus)
            );
    }

    public ngOnDestroy(): void {
        this._timerSubscription.unsubscribe();
        this._destroy$.next(true);
        this._destroy$.unsubscribe();
    }

    public handleLogout(): void {
        this.authenticationService.logout();
    }

    public dismissSystemNotification(systemNotification: SystemNotification): void {
        this.dismissedSystemNotifications.push(systemNotification.uid);
        localStorage.setItem(AuthenticatedContainerComponent.DISMISSED_NOTIFICATIONS, this.dismissedSystemNotifications.join(','));
        this.filterSystemNotifications(this.systemNotifications);
    }

    private filterSystemNotifications(systemNotifications: SystemNotification[]): void {
        this.systemNotifications = systemNotifications.filter(notification => {
            return !this.dismissedSystemNotifications.includes(notification.uid);
        });
    }

    private cleanDismissedSystemNotifications(systemNotifications: SystemNotification[]): void {
        const notificationUIDs = systemNotifications.map(notification => notification.uid);
        this.dismissedSystemNotifications = this.dismissedSystemNotifications.filter((dismissedNotification) => {
            return notificationUIDs.includes(dismissedNotification);
        });
        localStorage.setItem(AuthenticatedContainerComponent.DISMISSED_NOTIFICATIONS, this.dismissedSystemNotifications.join(','));
    }

}
