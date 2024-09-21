import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Trophy } from "lucide-react"

const classData = [
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "FPF Academy",
    location: "at Brunel, UB8 3PW",
    description: "The Future at their Feet",
    ageRange: "4 years to 16 years",
    tags: ["Football"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "TeachMajor",
    location: "at West Drayton Academy, UB7 9EA",
    description: "We offer holiday camps and instrumental lessons",
    ageRange: "4 years to 11 years",
    tags: ["Other Music & Drama"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "TeachMajor",
    location: "at Laurel Lane Primary, UB7 7TX",
    description: "We offer holiday camps and instrumental lessons",
    ageRange: "4 years to 11 years",
    tags: ["Other Music & Drama"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "TeachMajor",
    location: "at St Martins Primary School, UB7 7UF",
    description: "We offer holiday camps and instrumental lessons",
    ageRange: "4 years to 11 years",
    tags: ["Other Music & Drama"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "Futunity UK",
    location: "at Bishopshalt School, UB8 3RF",
    description: "Futunity UK offer dance and gymnastics classes from 2 years - adults in and around the Hillingdon borough. We teach ballet, street dance, hip hop, contemporary and tap.",
    ageRange: "4 years to 18 years",
    tags: ["Gymnastics"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "Kiddy Cook Hillingdon",
    location: "at Hermitage Primary School, UB8 1RB",
    description: "Each lesson is fun and educational as they get to learn new sweet or savoury dishes every week. They will learn life skills such as chopping, mixing and weighing new ingredients.",
    ageRange: "4 years to 7 years",
    tags: ["Cooking"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "Futunity UK",
    location: "at Hillingdon Sports Centre (Athletics Track Studio), UB8 1ES",
    description: "Futunity UK offer dance and gymnastics classes from 2 years - adults in and around the Hillingdon borough. We teach ballet, street dance, hip hop, contemporary and tap.",
    ageRange: "2 years to 18 years",
    tags: ["Ballet", "Tap Dance", "Street Dance", "Hip Hop"],
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    name: "Little Kickers Hillingdon",
    location: "at Hillingdon Sports & Leisure Complex, UB8 1ES",
    description: "Little Kickers football classes for kids aged 18 months to 7 years old",
    ageRange: "18 months to 7 years",
    tags: ["Football"],
  },
]

export default function Component() {
  return (
    <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classData.map((classItem, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-2">
                <img src={classItem.logo} alt={`${classItem.name} logo`} className="h-10 w-10 object-contain" />
                <div>
                  <h3 className="font-semibold">Kids class</h3>
                  <h4 className="text-lg font-bold">{classItem.name}</h4>
                  <p className="text-sm text-muted-foreground">{classItem.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{classItem.description}</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{classItem.ageRange}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {classItem.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between w-full">
                <Button variant="link" className="text-blue-600 p-0">
                  More info
                </Button>
                <Button variant="link" className="text-blue-600 p-0">
                  View schedule
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Card className="overflow-hidden bg-blue-50">
          <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
            <Trophy className="h-16 w-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-800 mb-2">Enter to win free classes for your child!</h3>
            <p className="text-sm text-blue-600 mb-4">Refer your other clubs and earn rewards.</p>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              Refer other clubs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}