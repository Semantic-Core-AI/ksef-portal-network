"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface SendToFriendDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calculatorUrl: string
}

export function SendToFriendDialog({ open, onOpenChange, calculatorUrl }: SendToFriendDialogProps) {
  const [senderName, setSenderName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  const defaultMessage = `Cześć!

Właśnie sprawdziłem kalkulator KSeF i pomyślałem, że może Cię to zainteresować. 

Kalkulator pokazuje ile firma może stracić bez wdrożenia Krajowego Systemu e-Faktur.

Sprawdź sam: ${calculatorUrl}

Pozdrawiam!`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      const response = await fetch("/api/send-to-friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName,
          recipientEmail,
          recipientName,
          message: message || defaultMessage,
          calculatorUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      toast.success("Wiadomość została wysłana!")
      onOpenChange(false)

      // Reset form
      setSenderName("")
      setRecipientEmail("")
      setRecipientName("")
      setMessage("")
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Poleć kalkulator znajomemu
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="senderName" className="text-sm font-medium">
              Twoje imię
            </label>
            <Input
              id="senderName"
              type="text"
              placeholder="Jan Kowalski"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recipientName" className="text-sm font-medium">
              Imię znajomego
            </label>
            <Input
              id="recipientName"
              type="text"
              placeholder="Piotr"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recipientEmail" className="text-sm font-medium">
              Email znajomego
            </label>
            <Input
              id="recipientEmail"
              type="email"
              placeholder="piotr@firma.pl"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Wiadomość (opcjonalna)
            </label>
            <Textarea
              id="message"
              placeholder={defaultMessage}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSending} className="flex-1">
              {isSending ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-pulse" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Wyślij
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4 mr-2" />
              Anuluj
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Nie będziemy spamować Twojego znajomego. To jednorazowa wiadomość.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
