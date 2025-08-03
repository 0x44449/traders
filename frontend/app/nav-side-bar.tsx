'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Heart, Search, Settings, Star, TrendingUp, User } from "lucide-react";
import { useState } from "react";

export default function NavSideBar() {
  const [activeMenu, setActiveMenu] = useState('search');
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [{
    id: 'search',
    icon: Search,
    label: '종목검색',
  }, {
    id: 'watchlist',
    icon: Heart,
    label: '관심종목',
    badge: 0,
  }];

  const bottomMenuItems = [{
    id: 'settings',
    icon: Settings,
    label: '설정',
  }, {
    id: 'profile',
    icon: User,
    label: '프로필',
  }];

  const renderCollapsed = () => {
    return (
      <div className="w-16 h-screen bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 sticky top-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
          title="메뉴 펼치기"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="flex flex-col gap-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeMenu === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveMenu(item.id)}
                className="h-10 w-10 p-0 relative"
                title={item.label}
              >
                <Icon className="h-4 w-4" />
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0"
                title={item.label}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>
    )
  }

  const renderExpanded = () => {
    return (
      <div className="w-80 h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0">
        {/* 헤더 */}
        <div className="p-4 border-b border-sidebar-border bg-sidebar-accent/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-sidebar-primary" />
              <h2 className="font-semibold text-sidebar-foreground">메뉴</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
              title="메뉴 접기"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 메인 메뉴 */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* 메뉴 항목들 */}
              <div className="space-y-2 mb-6">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeMenu === item.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3 h-10"
                      onClick={() => setActiveMenu(item.id)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-red-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* <Separator className="my-4" /> */}

              {/* 컨텐츠 영역 */}
              {/* <div className="space-y-4">
            </div> */}
            </div>
          </ScrollArea>
        </div>

        {/* 하단 메뉴 */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/50">
          <div className="space-y-2">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-9"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isExpanded ? renderExpanded() : renderCollapsed()}
    </>
  )
}