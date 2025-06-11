import {Injectable} from '@angular/core';
import {
  Settings,
  CalendarClock,
  Handshake,
  ChartLine,
  LogOut,
  MapPinPlusInside,
  CirclePlus,
  TrafficCone,
  Truck
} from 'lucide-angular';

@Injectable({
  providedIn: 'root'
})
export class LucideIconsService {

  private readonly lucideIcons = {
    Settings: Settings,
    CalendarClock: CalendarClock,
    Handshake: Handshake,
    ChartLine: ChartLine,
    LogOut: LogOut,
    MapPinPlusInside: MapPinPlusInside,
    CirclePlus: CirclePlus,
    TrafficCone: TrafficCone,
    Truck: Truck
  }

  getIcon(iconName: keyof typeof this.lucideIcons) {
    return this.lucideIcons[iconName];
  }



}
