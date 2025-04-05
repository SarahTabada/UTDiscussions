import models.*;
import services.*;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ForumService forum = new ForumService();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\nUTD Forum");
            System.out.println("1. Post Question");
            System.out.println("2. Reply to Question");
            System.out.println("3. View Questions");
            System.out.println("4. Exit");
            System.out.print("Choice: ");
            int choice = Integer.parseInt(scanner.nextLine());

            switch (choice) {
                case 1:
                    System.out.print("Title: ");
                    String title = scanner.nextLine();
                    System.out.print("Body: ");
                    String body = scanner.nextLine();
                    forum.postQuestion(title, body);
                    break;
                case 2:
                    forum.showQuestions();
                    System.out.print("Question # to reply to: ");
                    int index = Integer.parseInt(scanner.nextLine());
                    System.out.print("Your reply: ");
                    String reply = scanner.nextLine();
                    forum.replyToQuestion(index, reply);
                    break;
                case 3:
                    forum.showQuestions();
                    break;
                case 4:
                    System.out.println("Goodbye!");
                    return;
                default:
                    System.out.println("Invalid option.");
            }
        }
    }
}
