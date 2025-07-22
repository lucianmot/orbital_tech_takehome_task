import pytest
from utils.credit_calc import calculate_credits


@pytest.mark.parametrize(
    "text,expected_cost",
    [
        ("Are there any restrictions on alterations or improvements?", 5.5),
        ("Is there a clause for default and remedies?", 3.65),
        ("What are the indemnity provisions?", 2.9),
        ("What is the security deposit amount?", 3.4),
        (
            "What are the restrictions on operating hours and any related provisions for commercial tenants?",
            9.35,
        ),
        ("Are there any clauses related to property insurance?", 5.5),
        ("Who is responsible for maintenance and repairs?", 3.45),
        ("What happens if the property is sold during the lease term?", 7.35),
        ("Are there any environmental or zoning restrictions?", 4.95),
        ("Are there any specific rules for commercial tenants?", 4.3),
        ("What are the penalties for breaching the lease terms?", 7.05),
        ("Are there any clauses for dispute resolution?", 4.25),
        ("How are the common areas managed?", 2.75),
        (
            "Describe the penalties for late payment of rent and any grace periods provided in the lease agreement.",
            16.0,
        ),
        ("What is the rent and how is it varied?", 4.7),
        ("Are there any specific hours of operation?", 3.9),
        ("What is the process for handling disputes?", 3.6),
        (
            "Could you clarify the process for the landlord to return the security deposit at the end of the lease term?",
            18.35,
        ),
        ("What are the conditions for early termination?", 3.8),
        ("What is the process for renewing the lease?", 6.25),
        ("What are the payment terms for the rent?", 5.4),
        ("What is the notice period for terminating the lease?", 6.9),
        ("Are there any provisions for rent abatement?", 3.7),
        (
            "Explain how common area maintenance fees are calculated and billed to the tenant.",
            7.75,
        ),
        ("Are pets allowed in the property?", 2.85),
        ("Is there a clause for landlord entry into the property?", 5.35),
        (
            "Describe the dispute resolution mechanisms outlined in the lease, including mediation and arbitration procedures.",
            17.55,
        ),
        (
            "Detail the process and criteria for the landlord to enter the property for inspections or repairs.",
            11.1,
        ),
        (
            "What are the specific conditions that trigger the lease's break clause and the associated penalties, if any?",
            19.0,
        ),
        (
            "Can you provide a detailed explanation of the rent adjustment mechanism in the lease and how frequently it is applied?",
            18.0,
        ),
        ("How are property taxes handled?", 2.35),
        ("Is there an option to renew the lease?", 3.0),
        ("Are utilities included in the rent?", 2.75),
        ("orbital latibro", 2.0),
        (
            "amanaplanacanalpanamaamanaplanacanalpanamaamanaplanacanalpanamaamanaplanacanalpanamaamanaplanacanalpanama",
            28.1,
        ),
        (
            "abbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabbaabba",
            49.8,
        ),
        ("a", 2.0),
        ("aba", 2.0),
        ("the", 1.0),
        ("xyz", 1.0),
    ],
)
def test_known_report_credit_costs(text: str, expected_cost: float) -> None:
    c = calculate_credits(text)
    # Uncomment the following lines to debug the output
    # print(
    #     f"\nText: {text}\n"
    #     f"Char cost: {char_cost(text)}\n"
    #     f"Word cost: {word_cost(text)}\n"
    #     f"Third vowel cost: {third_vowel_cost(text)}\n"
    #     f"Length penalty: {length_penalty(text)}\n"
    #     f"Unique bonus: {unique_word_bonus(text, c)}\n"
    #     f"Palindrome bonus: {palindrome_bonus(text, c)}\n"
    #     f"Total: {c}"
    # )
    assert c == expected_cost
