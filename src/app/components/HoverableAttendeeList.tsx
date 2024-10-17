import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Attendee } from '@/src/app/types/globals.d'

interface HoverableAttendeeListProps {
  attendees: Attendee[]
  children: React.ReactNode
}

export default function HoverableAttendeeList({ attendees = [], children }: HoverableAttendeeListProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg" sideOffset={5} align="start">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Attendees</h4>
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <div key={`${attendee.id}`} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                    {attendee.first_name[0]}{attendee.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                    {attendee.first_name} {attendee.last_name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No attendees yet</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
