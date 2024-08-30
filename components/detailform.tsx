import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Detailform() {
  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-4xl py-16 space-y-8 rounded-lg shadow-xl">

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Update Your Profile</h1>
          <p className="mt-3 text-lg text-gray-500">Fill out the form below to update your personal information.</p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <div className="mt-1">
                <Input type="text" name="name" id="name" autoComplete="name" placeholder="John Doe" required />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="mt-1">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="website" className="block text-sm font-medium text-white">
                Website
              </label>
              <div className="mt-1">
                <Input
                  type="url"
                  name="website"
                  id="website"
                  autoComplete="website"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="profession" className="block text-sm font-medium text-white">
                Profession
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="profession"
                  id="profession"
                  autoComplete="profession"
                  placeholder="Software Engineer"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-white">
                About
              </label>
              <div className="mt-1">
                <Textarea name="about" id="about" rows={3} placeholder="Provide a brief description about yourself" />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="experience" className="block text-sm font-medium text-white">
                Experience
              </label>
              <div className="mt-1">
                <Textarea
                  name="experience"
                  id="experience"
                  rows={3}
                  placeholder="Describe your professional experience"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
