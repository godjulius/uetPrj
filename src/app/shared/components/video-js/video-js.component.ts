import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
// import 'videojs-hls-quality-selector';
import 'videojs-hls-quality-selector/src/plugin';

interface IPlayer extends Player {
    hlsQualitySelector: any;
}

@Component({
    selector: 'app-video-js',
    standalone: true,
    imports: [],
    templateUrl: './video-js.component.html',
    styleUrl: './video-js.component.css',
    encapsulation: ViewEncapsulation.None,
})
export class VideoJsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('target', { static: true }) target!: ElementRef;

    // See options: https://videojs.com/guides/options
    @Input() options: any = {
        controls: true,
        autoplay: false,
        sources: [
            {
                // src: 'https://vjs.zencdn.net/v/oceans.mp4',
                // type: 'video/mp4'
                src: 'https://d37u0eh7zt2bro.cloudfront.net/course/video/eaf5376f-82c8-4e03-bdb9-f8863808b5a6/hls.m3u8',
                type: 'application/x-mpegURL',
            },
        ],
        tracks: [
            {
                kind: 'subtitles',
                src: 'https://vjs.zencdn.net/v/oceans.vtt',
                srclang: 'en',
                label: 'English',
                default: true,
            },
        ],
        playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
        fill: true,
        controlBar: {
            skipButtons: {
                forward: 5,
                backward: 5,
            },
        },
        // --- Thêm cấu hình userActions.hotkeys vào đây ---
        userActions: {
            hotkeys: function (event: any) {
                // 'this' ở đây là đối tượng player Video.js
                const player: any = this;
                const key = event.key; // Lấy tên phím (ví dụ: ' ', 'ArrowLeft', 'm')
                // const keyCode = event.keyCode; // Lấy mã phím (ví dụ: 32, 37, 77) - dùng key thường dễ đọc hơn

                // Quan trọng: Chỉ xử lý hotkey nếu focus đang nằm trong player
                // Kiểm tra xem phần tử đang được focus có phải là player hoặc con của player không
                const activeEl = document.activeElement;
                if (
                    !player.el().contains(activeEl) &&
                    player.el() !== activeEl
                ) {
                    // Nếu focus không nằm trong player, bỏ qua không xử lý hotkey
                    // Bạn có thể thêm logic phức tạp hơn nếu cần kiểm tra focus trên control bar cụ thể
                    return;
                }

                const seekStep = 5; // Số giây để tua tới/lui (ví dụ: 10 giây)

                // Xử lý các phím cụ thể
                switch (key) {
                    // Phím Space để Play/Pause
                    case ' ':
                        // Ngăn hành động mặc định của trình duyệt (cuộn trang)
                        event.preventDefault();
                        if (player.paused()) {
                            player.play();
                        } else {
                            player.pause();
                        }
                        break;

                    // Phím 'm' hoặc 'M' để Mute/Unmute
                    case 'm':
                    case 'M':
                        event.preventDefault(); // Có thể không cần thiết cho 'm', nhưng để cho chắc
                        player.muted(!player.muted());
                        break;

                    // Phím mũi tên trái để tua lại (Backward)
                    case 'ArrowLeft':
                        event.preventDefault(); // Ngăn hành động mặc định của trình duyệt
                        const currentTimeLeft = player.currentTime();
                        player.currentTime(
                            Math.max(0, currentTimeLeft - seekStep)
                        ); // Tua lại seekStep giây, không đi dưới 0
                        break;

                    // Phím mũi tên phải để tua tới (Forward)
                    case 'ArrowRight':
                        event.preventDefault(); // Ngăn hành động mặc định của trình duyệt
                        const currentTimeRight = player.currentTime();
                        const duration = player.duration();
                        // Chỉ tua tới nếu video có thời lượng và không vượt quá thời lượng
                        if (duration && !isNaN(duration)) {
                            player.currentTime(
                                Math.min(duration, currentTimeRight + seekStep)
                            ); // Tua tới seekStep giây, không vượt quá duration
                        }
                        break;

                    // --- Bạn có thể thêm các hotkeys khác ở đây ---
                    // Ví dụ: Phím 'f' để Fullscreen
                    case 'f':
                    case 'F':
                        event.preventDefault();
                        if (player.isFullscreen()) {
                            player.exitFullscreen();
                        } else {
                            player.requestFullscreen();
                        }
                        break;

                    // Mặc định: không làm gì cho các phím khác, để chúng hoạt động bình thường
                    default:
                        break;
                }
            },
        },
        // --- Kết thúc cấu hình userActions.hotkeys ---
    };

    player!: Player;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {}

    // Instantiate a Video.js player
    ngAfterViewInit() {
        this.player = videojs(
            this.target.nativeElement,
            this.options,
            function onPlayerReady() {
                console.log('onPlayerReady', this);
                
                // register hlsQualitySelector plugin - a plugin for HLS quality selector
                // if ((this as any).hlsQualitySelector) {
                //     (this as any).hlsQualitySelector({
                //         displayCurrentQuality: true,
                //     });
                // }
                if ((this.player as any).hlsQualitySelector) {
                    (this.player as any).hlsQualitySelector({
                        displayCurrentQuality: true,
                    });
                }

                this.on('contextmenu', function (event: any) {
                    // Prevent the default right-click context menu
                    event.preventDefault();
                });
            }
        );
        (this.player as any).hlsQualitySelector({
            displayCurrentQuality: true,
        });
    }

    // Dispose the player OnDestroy
    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
